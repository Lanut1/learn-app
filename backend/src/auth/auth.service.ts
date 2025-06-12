import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  async register(registerDto: RegisterUserDto) {
    const existingUser = await this.dynamodbService.getUserByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException(`User with email ${registerDto.email} already exists.`);
    }

    const userId = randomUUID();

    const newUserPayload = {
      userId: userId,
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: registerDto.role || 'student',
      hashedPassword: registerDto.password,
      ...(registerDto.dob && { dob: registerDto.dob }),
      ...(registerDto.address && { address: registerDto.address }),
      ...(registerDto.specialization && { specialization: registerDto.specialization }),
    };

    return this.dynamodbService.createUser(newUserPayload);
  }
}
