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
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const API_URL = `${BASE_URL}/auth/profile`;
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return response.json();
}

export const loginUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const API_URL = `${BASE_URL}/auth/login`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

interface LogoutResponse {
  success: boolean;
}

//TODO: implement httponly cookies for token management
export const logoutUser = async (): Promise<LogoutResponse> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
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
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const payload = { currentPassword, newPassword, confirmPassword };
    
    const response = await fetch(`${BASE_URL}/auth/profile/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
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

export interface UploadUserPhotoRequest {
  data: string;
}

export interface UploadUserPhotoResponse {
  success: boolean;
  photo: string;
  message: string;
}

//TODO: Implement actual file upload logic
export const uploadUserPhoto = async (
  photoData: string,
): Promise<UploadUserPhotoResponse> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (!photoData) {
      const error: ApiError = {
        status: 400,
        message: "Photo data is required",
        code: "MISSING_PHOTO_DATA",
      };
      throw error;
    }

    return {
      success: true,
      photo: `https://example.com/photos/${Date.now()}.jpg`,
      message: "Photo uploaded successfully",
    };
  } catch (error) {
    console.error("Error uploading user photo:", error);
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
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    const token = localStorage.getItem("token");

    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
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
