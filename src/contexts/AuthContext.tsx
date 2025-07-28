import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  useLogin,
  useLogout,
  getStoredUser,
  getStoredToken,
  isAuthenticated,
} from "../hooks/useAuth";
import type { UserLoginPayload } from "../Api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  adminUser: UserLoginPayload | null;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<UserLoginPayload | null>(null);

  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isAuthenticated()) {
        const user = await getStoredUser();
        if (user) {
          setAdminUser(user);
          setIsAuthenticatedState(true);
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginMutation.mutateAsync({ email, password });

      if (result.user) {
        setAdminUser(result.user);
        setIsAuthenticatedState(true);
        return true;
      }
      localStorage.setItem("authToken", result.token || "");
      return false;
    } catch (error) {
      console.error("Sign in error:", error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setAdminUser(null);
      setIsAuthenticatedState(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const user = await getStoredUser();
      if (user) {
        setAdminUser(user);
      }
    } catch (error) {
      console.error("Profile refresh error:", error);
      throw error;
    }
  };

  const value = {
    isAuthenticated: isAuthenticatedState,
    isLoading,
    signIn,
    signOut,
    adminUser,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
