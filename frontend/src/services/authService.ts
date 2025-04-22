import { RegisterData, UserData } from "../types/auth.types";

export interface ApiError {
  status?: number;
  message: string;
  code?: string;
  details?: any;
}

// Simulate API call
// Mock user data - in a real app, this would fetch from the server
export const getUserProfile = async (): Promise<UserData> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 700));
    const token = localStorage.getItem('token');
    
    if (!token) {
      const error: ApiError = { 
        status: 401, 
        message: 'Not authenticated',
        code: 'AUTH_REQUIRED'
      };
      throw error;
    }
    
    if (token === 'mock-token-trainer' || token.includes('trainer')) {
      return {
        id: 'user-2',
        email: 'trainer@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        photo: undefined,
        isActive: true,
        role: 'trainer',
        specializationId: 'type-1',
        specialization: 'Fitness'
      };
    }

    return {
      id: 'user-1',
      email: 'student@example.com',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      photo: undefined,
      isActive: true,
      role: 'student',
      dateOfBirth: '1990-01-01',
      address: '123 Main St, Anytown, USA'
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

interface LoginResponse extends UserData {
  token?: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === 'student@example.com' && password === 'password') {
      return {
        id: 'user-1',
        email: 'student@example.com',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        photo: undefined,
        isActive: true,
        role: 'student',
        token: 'mock-token-student'
      };
    } else if (email === 'trainer@example.com' && password === 'password') {
      return {
        id: 'user-2',
        email: 'trainer@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        photo: undefined,
        isActive: true,
        role: 'trainer',
        token: 'mock-token-trainer'
      };
    } else {
      const error: ApiError = {
        status: 401,
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      };
      throw error;
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

interface LogoutResponse {
  success: boolean;
}

export const logoutUser = async (): Promise<LogoutResponse> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

interface RegisterResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isActive: boolean;
  role: 'student' | 'trainer';
  registrationMessage: string;
}

export const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
      const error: ApiError = {
        status: 400,
        message: 'Invalid email address',
        code: 'INVALID_EMAIL_FORMAT'
      };
      throw error;
    }
    
    if (!userData.password || userData.password.length < 6) {
      const error: ApiError = {
        status: 400,
        message: 'Password must be at least 6 characters',
        code: 'INVALID_PASSWORD_FORMAT'
      };
      throw error;
    }
    
    if (!userData.firstName || !userData.lastName) {
      const error: ApiError = {
        status: 400,
        message: 'First name and last name are required',
        code: 'MISSING_REQUIRED_FIELDS'
      };
      throw error;
    }
    if (userData.role !== 'student' && userData.role !== 'trainer') {
      const error: ApiError = {
        status: 400,
        message: 'Invalid role. Must be either "student" or "trainer"',
        code: 'INVALID_ROLE'
      };
      throw error;
    }
    
    if (userData.role === 'trainer' && !userData.specializationId) {
      const error: ApiError = {
        status: 400,
        message: 'Specialization is required for trainers',
        code: 'MISSING_SPECIALIZATION'
      };
      throw error;
    }
    
    // Mock successful registration
    const username = userData.email.split('@')[0];
    
    return {
      id: `user-${Math.floor(Math.random() * 1000)}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: username,
      isActive: true,
      role: userData.role,
      registrationMessage: 'Registration successful! You can now log in.'
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

export const updatePassword = async (currentPassword: string, newPassword: string): Promise<UpdatePasswordResponse> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (currentPassword !== 'password') {
      const error: ApiError = {
        status: 400,
        message: 'Current password is incorrect',
        code: 'INVALID_PASSWORD'
      };
      throw error;
    }
    
    if (!newPassword || newPassword.length < 6) {
      const error: ApiError = {
        status: 400,
        message: 'New password must be at least 6 characters',
        code: 'INVALID_PASSWORD_FORMAT'
      };
      throw error;
    }
    
    return { success: true, message: 'Password updated successfully' };
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export interface UpdateUserProfileRequest {
  firstName?: string;
  lastName?: string;
  address?: string;
  dateOfBirth?: string;
  [key: string]: any;
}

export type UpdateUserProfileResponse = UserData & {
  updatedAt: string;
};

export const updateUserProfile = async (userData: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 900));

    const token = localStorage.getItem('token');
    if (!token) {
      const error: ApiError = {
        status: 401,
        message: 'Not authenticated',
        code: 'AUTH_REQUIRED'
      };
      throw error;
    }
  
    const currentUserData = await getUserProfile();
    
    return {
      ...currentUserData,
      ...userData,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export interface UploadUserPhotoRequest {
  data: string;
}

export interface UploadUserPhotoResponse {
  success: boolean;
  photo: string;
  message: string;
}

export const uploadUserPhoto = async (photoData: string): Promise<UploadUserPhotoResponse> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (!photoData) {
      const error: ApiError = {
        status: 400,
        message: 'Photo data is required',
        code: 'MISSING_PHOTO_DATA'
      };
      throw error;
    }
    
    return {
      success: true,
      photo: `https://example.com/photos/${Date.now()}.jpg`,
      message: 'Photo uploaded successfully'
    };
  } catch (error) {
    console.error('Error uploading user photo:', error);
    throw error;
  }
};

export interface DeleteUserAccountResponse {
  success: boolean;
  message: string;
}

export const deleteUserAccount = async (): Promise<DeleteUserAccountResponse> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const token = localStorage.getItem('token');
    if (!token) {
      const error: ApiError = {
        status: 401,
        message: 'Not authenticated',
        code: 'AUTH_REQUIRED'
      };
      throw error;
    }
    
    return { success: true, message: 'Account deleted successfully' };
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

export const saveUserToServer = async (userData: Partial<UserData>): Promise<UserData> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const token = localStorage.getItem('token');
    if (!token) {
      const error: ApiError = {
        status: 401,
        message: 'Not authenticated',
        code: 'AUTH_REQUIRED'
      };
      throw error;
    }
    
    const currentUserData = await getUserProfile();
    
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      const error: ApiError = {
        status: 400,
        message: 'Invalid email format',
        code: 'INVALID_EMAIL_FORMAT'
      };
      throw error;
    }
    
    const updatedUser: UserData & { updatedAt: string } = {
      ...currentUserData,
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    console.log('User data saved to server:', updatedUser);
    
    return updatedUser;
  } catch (error) {
    console.error('Error saving user to server:', error);
    throw error;
  }
};
