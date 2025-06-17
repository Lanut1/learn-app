import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserItem } from 'src/dynamodb/dynamodb.service';

jest.mock('bcrypt');

const mockDynamodbService = {
  getUserById: jest.fn(),
  getUserByEmail: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let dbService: DynamodbService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: DynamodbService, useValue: mockDynamodbService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    dbService = module.get<DynamodbService>(DynamodbService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return a user profile if user is found', async () => {
      const user: UserItem = {
        userId: 'test-id',
        email: 'test@test.com',
        username: 'testuser',
        hashedPassword: 'hashed-password',
        firstName: 'Test',
        lastName: 'User',
        role: 'student',
        pk: '', sk: '', createdAt: ''
      };
      mockDynamodbService.getUserById.mockResolvedValue(user);

      const result = await service.getProfile('test-id');

      expect(result).toEqual({
        userId: 'test-id',
        email: 'test@test.com',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        role: 'student',
        pk: '', sk: '', createdAt: ''
      });
      expect('hashedPassword' in result).toBe(false);
      expect(mockDynamodbService.getUserById).toHaveBeenCalledWith('test-id');
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      mockDynamodbService.getUserById.mockResolvedValue(null);

      await expect(service.getProfile('non-existent-id')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    it('should return an access token and user for valid credentials', async () => {
      const user = { userId: '1', email: 'test@test.com', hashedPassword: 'hashed', role: 'student' };
      mockDynamodbService.getUserByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue('test-token');

      const result = await service.login({ email: 'test@test.com', password: 'password' });

      expect(result.accessToken).toEqual('test-token');
      expect('hashedPassword' in result.user).toBe(false);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({ sub: '1', email: 'test@test.com', role: 'student' });
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const user = { userId: '1', email: 'test@test.com', hashedPassword: 'hashed', role: 'student' };
      mockDynamodbService.getUserByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login({ email: 'test@test.com', password: 'wrong-password' })).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto: RegisterUserDto = { email: 'new@test.com', password: 'password', firstName: 'New', lastName: 'User' };
      const createdUser = { userId: 'new-id', role: 'student', ...registerDto };
      mockDynamodbService.getUserByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-new-password');
      mockDynamodbService.createUser.mockResolvedValue(createdUser);
      mockJwtService.signAsync.mockResolvedValue('new-token');

      const result = await service.register(registerDto);

      expect(result.accessToken).toEqual('new-token');
      expect(result.user).toEqual(createdUser);
      expect(mockDynamodbService.createUser).toHaveBeenCalled();
    });

    it('should throw ConflictException if email already exists', async () => {
      const registerDto: RegisterUserDto = { email: 'existing@test.com', password: 'password', firstName: 'New', lastName: 'User' };
      mockDynamodbService.getUserByEmail.mockResolvedValue({ userId: 'existing-id' });

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('updateProfile', () => {
    it('should update the user profile and return the updated user', async () => {
      const updatedUser = { userId: '1', firstName: 'Updated' };
      mockDynamodbService.updateUser.mockResolvedValue(updatedUser);

      const result = await service.updateProfile('1', { firstName: 'Updated' });

      expect(result).toEqual(updatedUser);
      expect(mockDynamodbService.updateUser).toHaveBeenCalledWith('1', { firstName: 'Updated' });
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      mockDynamodbService.updateUser.mockResolvedValue(null);

      await expect(service.updateProfile('non-existent-id', { firstName: 'Updated' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('changePassword', () => {
    const user = { userId: '1', hashedPassword: 'old-hashed-password' };
    const changePasswordDto = { currentPassword: 'old-password', newPassword: 'new-password', confirmPassword: 'new-password' };

    it('should successfully change the password', async () => {
      mockDynamodbService.getUserById.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('new-hashed-password');

      const result = await service.changePassword('1', changePasswordDto);

      expect(result.success).toBe(true);
      expect(mockDynamodbService.updateUser).toHaveBeenCalledWith('1', { hashedPassword: 'new-hashed-password' });
    });

    it('should throw UnauthorizedException for incorrect current password', async () => {
      mockDynamodbService.getUserById.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.changePassword('1', changePasswordDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
        mockDynamodbService.getUserById.mockResolvedValue(null);

        await expect(service.changePassword('non-existent-id', changePasswordDto)).rejects.toThrow(
            NotFoundException,
        );
    });
  });

  describe('deleteAccount', () => {
    it('should call deleteUser and return success', async () => {
      mockDynamodbService.deleteUser.mockResolvedValue(undefined);

      const result = await service.deleteAccount('1');

      expect(result.success).toBe(true);
      expect(mockDynamodbService.deleteUser).toHaveBeenCalledWith('1');
    });
  });
});
