import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

const validRoles = ['student', 'trainer'] as const;
type Role = typeof validRoles[number];

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsOptional()
  @IsIn(validRoles)
  role?: Role;

  @IsOptional() @IsString() dob?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() specialization?: string;
}
