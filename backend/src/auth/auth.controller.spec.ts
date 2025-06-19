import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
  getProfile: jest.fn(),
  updateProfile: jest.fn(),
  changePassword: jest.fn(),
  deleteAccount: jest.fn(),
};

const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register with the correct DTO', async () => {
      const registerDto: RegisterUserDto = { email: 'test@test.com', password: 'password', firstName: 'Test', lastName: 'User' };
      mockAuthService.register.mockResolvedValue({ accessToken: 'token', user: {} });
      
      await controller.register(registerDto);
      expect(service.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should call authService.login with the correct DTO', async () => {
      const loginDto: LoginUserDto = { email: 'test@test.com', password: 'password' };
      mockAuthService.login.mockResolvedValue({ accessToken: 'token', user: {} });

      await controller.login(loginDto);
      
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('getProfile', () => {
    it('should call authService.getProfile with the user ID from the request', async () => {
      const mockRequest = { user: { sub: 'user-id-from-token' } };
      mockAuthService.getProfile.mockResolvedValue({ id: 'user-id-from-token' });

      await controller.getProfile(mockRequest);

      expect(service.getProfile).toHaveBeenCalledWith('user-id-from-token');
    });
  });

  describe('updateProfile', () => {
    it('should call authService.updateProfile with the user ID and DTO', async () => {
      const mockRequest = { user: { sub: 'user-id' } };
      const updateUserDto: UpdateUserDto = { firstName: 'Updated' };
      mockAuthService.updateProfile.mockResolvedValue({ firstName: 'Updated' });

      await controller.updateProfile(mockRequest, updateUserDto);

      expect(service.updateProfile).toHaveBeenCalledWith('user-id', updateUserDto);
    });
  });

  describe('changePassword', () => {
    it('should call authService.changePassword with the user ID and DTO', async () => {
      const mockRequest = { user: { sub: 'user-id' } };
      const changePasswordDto: ChangePasswordDto = { currentPassword: 'old', newPassword: 'new', confirmPassword: 'new' };
      mockAuthService.changePassword.mockResolvedValue({ success: true, message: 'updated' });

      await controller.changePassword(mockRequest, changePasswordDto);

      expect(service.changePassword).toHaveBeenCalledWith('user-id', changePasswordDto);
    });
  });

  describe('deleteAccount', () => {
    it('should call authService.deleteAccount with the user ID', async () => {
      const mockRequest = { user: { sub: 'user-id' } };
      mockAuthService.deleteAccount.mockResolvedValue({ success: true, message: 'deleted' });

      await controller.deleteAccount(mockRequest);

      expect(service.deleteAccount).toHaveBeenCalledWith('user-id');
    });
  });
});
