import { RegistrationData, Role, UserData } from "../types/auth.types";

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
    await new Promise((resolve) => setTimeout(resolve, 700));
    const token = localStorage.getItem("token");

    if (!token) {
      const error: ApiError = {
        status: 401,
        message: "Not authenticated",
        code: "AUTH_REQUIRED",
      };
      throw error;
    }

    if (token === "mock-token-trainer" || token.includes("trainer")) {
      return {
        id: "user-2",
        email: "trainer@example.com",
        firstName: "Jane",
        lastName: "Smith",
        username: "janesmith",
        photo: undefined,
        isActive: true,
        role: "trainer",
        specializationId: "type-1",
        specialization: "frontend",
      };
    }

    return {
      id: "user-1",
      email: "student@example.com",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      photo: undefined,
      isActive: true,
      role: "student",
      dateOfBirth: "1990-01-01",
      address: "123 Main St, Anytown, USA",
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

interface LoginResponse extends UserData {
  token?: string;
}

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === "student@example.com" && password === "password") {
      return {
        id: "user-1",
        email: "student@example.com",
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        photo: undefined,
        isActive: true,
        role: "student",
        dob: "10/27/1998",
        address: "Belgrade, Mike Alasa 19",
        trainers: [
          { name: "Elizabeth Lopez", specialization: "PHP" },
          { name: "John Down", specialization: "Java Script" },
        ],
        token: "mock-token-student",
      };
    } else if (email === "trainer@example.com" && password === "password") {
      return {
        id: "user-2",
        email: "trainer@example.com",
        firstName: "Jane",
        lastName: "Smith",
        username: "janesmith",
        photo: undefined,
        isActive: true,
        role: "trainer",
        address: "Belgrade, Mike Alasa 19",
        specialization: "frontend",
        students: [
          { name: "Anna Ivanova", isActive: true },
          { name: "Peter Smith", isActive: false },
        ],
        token: "mock-token-trainer",
      };
    } else if (email === "12345@gmail.com" && password === "Hello12345!") {
      return {
        id: "user-2",
        email: "12345@gmail.com",
        firstName: "Anna",
        lastName: "Smith",
        username: "anasmith",
        photo: undefined,
        isActive: true,
        role: "trainer",
        address: "Belgrade, Mike Alasa 19",
        specialization: "backend",
        students: [
          { name: "Anna Ivanova", isActive: true },
          { name: "Peter Smith", isActive: false },
        ],
        token: "mock-token-trainer",
      };
    } else {
      const error: ApiError = {
        status: 401,
        message: "Invalid email or password",
        code: "INVALID_CREDENTIALS",
      };
      throw error;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

interface LogoutResponse {
  success: boolean;
}

export const logoutUser = async (): Promise<LogoutResponse> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
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
  role: Role;
  registrationMessage: string;
}

export const registerUser = async (
  userData: RegistrationData,
  role: Role = "student",
): Promise<RegisterResponse> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const username = userData.email.split("@")[0];

    return {
      id: `user-${Math.floor(Math.random() * 1000)}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: username,
      isActive: true,
      role: role,
      registrationMessage: "Registration successful! You can now log in.",
    };
  } catch (error) {
    console.error("Registration error:", error);
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
