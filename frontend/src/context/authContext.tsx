import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, RegistrationData, Role, UserData } from "../types/auth.types";
import { getUserProfile, loginUser, logoutUser, registerUser, saveUserToServer } from "../services/authService";
import { useLocation } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    setError(null);
  }, [location]);

  const fetchUserProfile = async (): Promise<void> => {
    try {
      setLoading(true);
      const userData = await getUserProfile();
      setCurrentUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<UserData | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.token || 'mock-token');
      setCurrentUser(response);
      setIsAuthenticated(true);
      return response;
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await logoutUser();
      localStorage.removeItem('token');
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegistrationData, role: Role = 'student'): Promise<any> => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerUser(userData, role);
      return response;
    } catch (error: any) {
      console.error('Register error:', error);
      setError(error.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async (
    newUserData: Partial<UserData>
  ): Promise<void> => {
    try {
      setLoading(true);
      const updatedUser = await saveUserToServer(newUserData);
      setCurrentUser(updatedUser);
    } catch (error: any) {
      console.error('Error updating user data:', error);
      setError(error.message || 'Failed to update user data');
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
