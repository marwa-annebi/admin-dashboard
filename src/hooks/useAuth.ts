import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../Api";
import type { AdminProfile, User, UserLoginPayload } from "../Api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  user?: UserLoginPayload;
  token?: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignupResponse {
  successmessage?: string;
  user?: User;
}

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
  users: () => [...authKeys.all, "users"] as const,
  user: (id: string) => [...authKeys.users(), id] as const,
};

// Auth hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (credentials) => {
      const response = await AuthService.postApiAuthSignin({
        requestBody: credentials,
      });
      return response;
    },
    onSuccess: (data) => {
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      // Store user data
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      // Invalidate and refetch user queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};

export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: async (userData) => {
      const response = await AuthService.postApiAuthSignup({
        requestBody: userData,
      });
      return response;
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      // Clear local storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
    },
  });
};

// Helper functions
export const getStoredUser = async (): Promise<AdminProfile | undefined> => {
  const token = localStorage.getItem("authToken");
  const user = await AuthService.getApiAuthAdminProfile();
  return user ? user.admin : undefined;
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem("authToken");
};

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};
