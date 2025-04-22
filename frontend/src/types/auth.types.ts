import { ReactNode } from "react";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthError {
  errorCode: number;
  message: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo?: string;
  isActive: boolean;
  role: 'student' | 'trainer';
  [key: string]: any;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'trainer';
  specializationId?: string;
  dateOfBirth?: Date | null;
  address?: string;
  [key: string]: any;
}

export interface AuthContextType {
  currentUser: UserData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<UserData | undefined>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<any>;
  updateUserData: (newUserData: Partial<UserData>) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
