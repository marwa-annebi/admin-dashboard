// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Swagger Documentation
  SWAGGER: {
    JSON: "/swagger.json",
    DOCS: "/api-docs",
  },

  // Parents Management
  PARENTS: {
    LIST: "/parents",
    CREATE: "/parents",
    GET: (id: string) => `/parents/${id}`,
    UPDATE: (id: string) => `/parents/${id}`,
    DELETE: (id: string) => `/parents/${id}`,
    CHILDREN: (id: string) => `/parents/${id}/children`,
    STATISTICS: "/parents/statistics",
  },

  // Children Management
  CHILDREN: {
    LIST: "/children",
    CREATE: "/children",
    GET: (id: string) => `/children/${id}`,
    UPDATE: (id: string) => `/children/${id}`,
    DELETE: (id: string) => `/children/${id}`,
    PROGRESS: (id: string) => `/children/${id}/progress`,
    ENROLL: (id: string) => `/children/${id}/enroll`,
  },

  // Languages Management
  LANGUAGES: {
    LIST: "/languages",
    CREATE: "/languages",
    GET: (id: string) => `/languages/${id}`,
    UPDATE: (id: string) => `/languages/${id}`,
    DELETE: (id: string) => `/languages/${id}`,
    DOMAINS: (id: string) => `/languages/${id}/domains`,
    STATISTICS: (id: string) => `/languages/${id}/statistics`,
  },

  // Domains Management
  DOMAINS: {
    LIST: "/domains",
    CREATE: "/domains",
    GET: (id: string) => `/domains/${id}`,
    UPDATE: (id: string) => `/domains/${id}`,
    DELETE: (id: string) => `/domains/${id}`,
    LESSONS: (id: string) => `/domains/${id}/lessons`,
    BY_LANGUAGE: (languageId: string) => `/languages/${languageId}/domains`,
  },

  // Lessons Management
  LESSONS: {
    LIST: "/lessons",
    CREATE: "/lessons",
    GET: (id: string) => `/lessons/${id}`,
    UPDATE: (id: string) => `/lessons/${id}`,
    DELETE: (id: string) => `/lessons/${id}`,
    WORDS: (id: string) => `/lessons/${id}/words`,
    BY_DOMAIN: (domainId: string) => `/domains/${domainId}/lessons`,
    PUBLISH: (id: string) => `/lessons/${id}/publish`,
    UNPUBLISH: (id: string) => `/lessons/${id}/unpublish`,
  },

  // Words Management
  WORDS: {
    LIST: "/words",
    CREATE: "/words",
    GET: (id: string) => `/words/${id}`,
    UPDATE: (id: string) => `/words/${id}`,
    DELETE: (id: string) => `/words/${id}`,
    BY_LESSON: (lessonId: string) => `/lessons/${lessonId}/words`,
    BULK_CREATE: "/words/bulk",
    IMPORT: "/words/import",
    EXPORT: (lessonId: string) => `/lessons/${lessonId}/words/export`,
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    PARENTS: "/analytics/parents",
    CHILDREN: "/analytics/children",
    LANGUAGES: "/analytics/languages",
    LEARNING_PROGRESS: "/analytics/learning-progress",
    POPULAR_WORDS: "/analytics/popular-words",
    USER_ENGAGEMENT: "/analytics/user-engagement",
  },

  // Settings
  SETTINGS: {
    GENERAL: "/settings/general",
    NOTIFICATIONS: "/settings/notifications",
    EMAIL: "/settings/email",
    BACKUP: "/settings/backup",
  },
};

// Request Headers
export const getAuthHeaders = (token?: string) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

// File Upload Headers
export const getFileUploadHeaders = (token?: string) => ({
  ...(token && { Authorization: `Bearer ${token}` }),
  // Note: Don't set Content-Type for file uploads, let browser set it
});

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "admin_access_token",
  REFRESH_TOKEN: "admin_refresh_token",
  USER_DATA: "admin_user_data",
  LANGUAGE_PREFERENCES: "admin_language_prefs",
};

// API Query Parameters
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
};

export const SORT_OPTIONS = {
  CREATED_AT_DESC: { sortBy: "createdAt", sortOrder: "desc" as const },
  CREATED_AT_ASC: { sortBy: "createdAt", sortOrder: "asc" as const },
  NAME_ASC: { sortBy: "name", sortOrder: "asc" as const },
  NAME_DESC: { sortBy: "name", sortOrder: "desc" as const },
  ORDER_ASC: { sortBy: "order", sortOrder: "asc" as const },
};

// File Upload Constraints
export const FILE_CONSTRAINTS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_AUDIO_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_AUDIO_TYPES: ["audio/mpeg", "audio/wav", "audio/ogg"],
};
