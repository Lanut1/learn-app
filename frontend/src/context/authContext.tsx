import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContextType, AuthProviderProps, RegistrationData, Role, UserData } from "../types/auth.types";
import { deleteUserAccount, getUserProfile, loginUser, logoutUser, registerUser, saveUserToServer, updatePassword } from "../services/authService";
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

  const profileFetched = useRef(false); 

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (token && !profileFetched.current) {
        try {
          await fetchUserProfile();
          profileFetched.current = true;
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        console.log("Token missing OR profile already fetched...");
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const fetchUserProfile = async (): Promise<void> => {
    try {
      const userData = await getUserProfile();
      setCurrentUser(userData);
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      throw error;
    }
  };

  const location = useLocation();

  useEffect(() => {
    setError(null);
  }, [location]);

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
      profileFetched.current = false;
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

  const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string): Promise<any> => {
    try {
      setLoading(true);
      setError(null);
      const response = await updatePassword(currentPassword, newPassword, confirmPassword);
      return response;
    } catch (error: any) {
      console.error('Change password error:', error);
      setError(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  }

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

  const deleteAccount = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await deleteUserAccount();
      if (response.success) {
        console.log(response.message);
        localStorage.removeItem('token');
        setCurrentUser(null);
        profileFetched.current = false;
        setIsAuthenticated(false);
      } else {
        throw new Error(response.message || 'Failed to delete account');
      }
    } catch (error: any) {
      console.error('Error deleting account:', error);
      setError(error.message || 'Failed to delete account');
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
    changePassword,
    updateUserData,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};
