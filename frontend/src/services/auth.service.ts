import { RegistrationData, UserData } from "../types/auth.types";

export interface ApiError {
  status?: number;
  message: string;
  code?: string;
  details?: any;
}

export interface AuthResponse {
  accessToken: string;
  user: UserData;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserProfile = async (): Promise<UserData> => {
    const API_URL = `${BASE_URL}/auth/profile`;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return response.json();
}

export const loginUser = async (
  email: string,
  password: string,
): Promise<UserData> => {
  const API_URL = `${BASE_URL}/auth/login`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

interface LogoutResponse {
  message: string;
}

export const logoutUser = async (): Promise<LogoutResponse> => {
  try {
    const API_URL = `${BASE_URL}/auth/logout`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error('Logout failed on the server.');
    }

    return await response.json();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const registerUser = async (
  userData: RegistrationData,
): Promise<AuthResponse> => {
  const API_URL = `${BASE_URL}/auth/register`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
};

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
): Promise<UpdatePasswordResponse> => {
  try {
    const payload = { currentPassword, newPassword, confirmPassword };
    
    const response = await fetch(`${BASE_URL}/auth/profile/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update password');
    }

    return response.json();
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export interface DeleteUserAccountResponse {
  success: boolean;
  message: string;
}

export const deleteUserAccount =
  async (): Promise<DeleteUserAccountResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user profile');
      }

      return response.json();

    } catch (error) {
      console.error("Error deleting user account:", error);
      throw error;
    }
  };

export const saveUserToServer = async (
  userData: Partial<UserData>,
): Promise<UserData> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user profile');
    }

    return response.json();
  } catch (error) {
    console.error("Error saving user to server:", error);
    throw error;
  }
};
