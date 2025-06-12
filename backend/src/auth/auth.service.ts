import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { DynamodbService, UserItem } from 'src/dynamodb/dynamodb.service';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './auth.constants';

type AuthResponse = {
  accessToken: string;
  user: Omit<UserItem, 'hashedPassword'>;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly dynamodbService: DynamodbService,
    private readonly jwtService: JwtService,
  ) {}

  async getProfile(userId: string) {
    const user = await this.dynamodbService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const { hashedPassword, ...result } = user;
    return result;
  }

  async login(loginDto: LoginUserDto): Promise<AuthResponse> {
    const { email, password } = loginDto;
    const user = await this.dynamodbService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      const { accessToken } = await this._signInToken(user.userId, user.email);
      const { hashedPassword, ...userProfile } = user;
      
      return { accessToken, user: userProfile };
    }
    
    throw new UnauthorizedException('Please check your login credentials');
  }

  async register(registerDto: RegisterUserDto): Promise<AuthResponse> {
    const existingUser = await this.dynamodbService.getUserByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException(`User with email ${registerDto.email} already exists.`);
    }

    const userId = randomUUID();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    const newUserPayload = {
      userId: userId,
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: registerDto.role || 'student',
      hashedPassword: hashedPassword,
      ...(registerDto.dob && { dob: registerDto.dob }),
      ...(registerDto.address && { address: registerDto.address }),
      ...(registerDto.specialization && { specialization: registerDto.specialization }),
    };

    const createdUser = await this.dynamodbService.createUser(newUserPayload);
    const { accessToken } = await this._signInToken(createdUser.userId, createdUser.email);

    return { accessToken, user: createdUser };
  }

  private async _signInToken(userId: string, email: string): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { sub: userId, email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
