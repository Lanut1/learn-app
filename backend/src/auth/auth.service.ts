import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './auth.constants';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserItem } from 'src/dynamodb/dynamodb.types';
import { PasswordService } from 'src/password/password.service';

type AuthResponse = {
  accessToken: string;
  user: Omit<UserItem, 'hashedPassword'>;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly dynamodbService: DynamodbService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
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

    if (user && (await this.passwordService.compare(password, user.hashedPassword))) {
      const { accessToken } = await this._signInToken(user.userId, user.email, user.role);
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
    const hashedPassword = await this.passwordService.hash(registerDto.password);

    const newUserPayload = {
      userId: userId,
      email: registerDto.email,
      username: registerDto.email.split('@')[0],
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: registerDto.role || 'student',
      isActive: true,
      hashedPassword: hashedPassword,
      ...(registerDto.dob && { dob: registerDto.dob }),
      ...(registerDto.address && { address: registerDto.address }),
      ...(registerDto.specialization && { specialization: registerDto.specialization }),
    };

    const createdUser = await this.dynamodbService.createUser(newUserPayload);
    const { accessToken } = await this._signInToken(createdUser.userId, createdUser.email, createdUser.role);

    return { accessToken, user: createdUser };
  }

    async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.dynamodbService.updateUser(userId, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException('User not found.');
    }

    const { hashedPassword, ...result } = updatedUser;
    return result;
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.dynamodbService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPasswordMatching = await this.passwordService.compare(
      changePasswordDto.currentPassword,
      user.hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Current password is incorrect.');
    }

    const newHashedPassword = await this.passwordService.hash(changePasswordDto.newPassword);

    await this.dynamodbService.updateUser(userId, {
      hashedPassword: newHashedPassword,
    });

    return { success: true, message: 'Password updated successfully' };
  }

  async deleteAccount(userId: string) {
    await this.dynamodbService.deleteUser(userId);
    return { success: true, message: 'Account deleted successfully' };
  }

  private async _signInToken(userId: string, email: string, role: string): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { sub: userId, email, role };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
