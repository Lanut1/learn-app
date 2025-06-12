import { RegistrationData, UserData } from "../types/auth.types";

export interface ApiError {
  status?: number;
  message: string;
  code?: string;
  details?: any;
}

interface AuthResponse {
  accessToken: string;
  user: UserData;
}

export const getUserProfile = async (): Promise<UserData> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/profile`;
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
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;

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
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/register`;

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
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (currentPassword !== "password") {
      const error: ApiError = {
        status: 400,
        message: "Current password is incorrect",
        code: "INVALID_PASSWORD",
      };
      throw error;
    }

    if (newPassword !== confirmPassword) {
      const error: ApiError = {
        status: 400,
        message: "Passwords do not match",
        code: "INVALID_PASSWORD_FORMAT",
      };
      throw error;
    }

    if (!newPassword || newPassword.length < 6) {
      const error: ApiError = {
        status: 400,
        message: "New password must be at least 6 characters",
        code: "INVALID_PASSWORD_FORMAT",
      };
      throw error;
    }

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Error updating password:", error);
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

export const updateUserProfile = async (
  userData: UpdateUserProfileRequest,
): Promise<UpdateUserProfileResponse> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 900));

    const token = localStorage.getItem("token");
    if (!token) {
      const error: ApiError = {
        status: 401,
        message: "Not authenticated",
        code: "AUTH_REQUIRED",
      };
      throw error;
    }

    const currentUserData = await getUserProfile();

    return {
      ...currentUserData,
      ...userData,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
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
      await new Promise((resolve) => setTimeout(resolve, 800));

      const token = localStorage.getItem("token");
      if (!token) {
        const error: ApiError = {
          status: 401,
          message: "Not authenticated",
          code: "AUTH_REQUIRED",
        };
        throw error;
      }

      return { success: true, message: "Account deleted successfully" };
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw error;
    }
  };

export const saveUserToServer = async (
  userData: Partial<UserData>,
): Promise<UserData> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const token = localStorage.getItem("token");
    if (!token) {
      const error: ApiError = {
        status: 401,
        message: "Not authenticated",
        code: "AUTH_REQUIRED",
      };
      throw error;
    }

    const currentUserData = await getUserProfile();

    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      const error: ApiError = {
        status: 400,
        message: "Invalid email format",
        code: "INVALID_EMAIL_FORMAT",
      };
      throw error;
    }

    const updatedUser: UserData & { updatedAt: string } = {
      ...currentUserData,
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    console.log("User data saved to server:", updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("Error saving user to server:", error);
    throw error;
  }
};
