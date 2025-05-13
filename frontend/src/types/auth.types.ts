import { ReactNode } from "react";

export interface LoginCredentials {
  email: string;
  password: string;
}

export type Role = "student" | "trainer";

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo?: string;
  isActive: boolean;
  role: Role;
  [key: string]: any;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  dob?: string;
  address?: string;
  specialization?: string;
  password: string;
};

export interface AuthContextType {
  currentUser: UserData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<UserData | undefined>;
  logout: () => Promise<void>;
  register: (userData: RegistrationData, role?: Role) => Promise<any>;
  updateUserData: (newUserData: Partial<UserData>) => void;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<any>;
  deleteAccount: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
