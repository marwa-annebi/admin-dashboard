import { OpenAPI } from "../Api/core/OpenAPI";
import { API_CONFIG, STORAGE_KEYS } from "./api";
import type { ApiRequestOptions } from "../Api/core/ApiRequestOptions";

// Configure OpenAPI settings
export const setupAPI = () => {
  // Set the base URL
  OpenAPI.BASE = API_CONFIG.BASE_URL;

  // Set credentials
  OpenAPI.WITH_CREDENTIALS = true;
  OpenAPI.CREDENTIALS = "include";

  // Set up token resolver
  OpenAPI.TOKEN = async (_options: ApiRequestOptions): Promise<string> => {
    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return token || "";
  };

  // Set up headers resolver
  OpenAPI.HEADERS = async (
    options: ApiRequestOptions
  ): Promise<Record<string, string>> => {
    const headers: Record<string, string> = {};

    // Only set Content-Type for non-multipart requests
    // For multipart/form-data, let the browser set the Content-Type with boundary
    if (options.mediaType !== "multipart/form-data") {
      headers["Content-Type"] = "application/json";
    }

    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  };
};

// Helper function to clear auth data on 401 errors
export const clearAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
};

// Initialize API configuration
setupAPI();
