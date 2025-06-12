import { ReactNode } from "react";

export interface LoginCredentials {
  email: string;
  password: string;
}

export type Role = "student" | "trainer";
// TODO: update the types to match the backend, for example smth like this:
// interface StudentSpecificData {
//   dob?: string;
//   address?: string;
//   trainers: Array<{ name: string; specialization: string }>;
// }

// interface TrainerSpecificData {
//   specializationId?: string;
//   specialization?: string;
//   students: Array<{ name: string; isActive: boolean }>;
// }

// export type UserData = (
//   | (StudentSpecificData & { role: 'student' })
//   | (TrainerSpecificData & { role: 'trainer' })
// ) & {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   isActive: boolean;
//   photo?: string;
// };

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
  role?: Role;
}

export interface AuthContextType {
  currentUser: UserData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<UserData | undefined>;
  logout: () => Promise<void>;
  register: (userData: RegistrationData, role?: Role) => Promise<any>;
  updateUserData: (newUserData: Partial<UserData>) => void;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => Promise<any>;
  deleteAccount: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
