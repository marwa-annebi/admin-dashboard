// API Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  user: AdminUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "super_admin";
  avatar?: string;
  lastLogin?: string;
  permissions: string[];
}

export interface ProfileResponse {
  user: AdminUser;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Dashboard Analytics Types
export interface DashboardStats {
  totalParents: number;
  totalChildren: number;
  totalLanguages: number;
  totalDomains: number;
  totalLessons: number;
  totalWords: number;
  activeUsers: number;
  completedLessons: number;
  parentsGrowthPercentage: number;
  childrenGrowthPercentage: number;
  newLanguagesAdded: number;
  lessonsCompletedPercentage: number;
}

// Parent Management Types
export interface Parent {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  children: Child[];
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  subscription?: {
    plan: "free" | "premium" | "family";
    expiresAt?: string;
    isActive: boolean;
  };
}

export interface Child {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  parentId: string;
  enrolledLanguages: string[];
  currentLevel: number;
  totalWordsLearned: number;
  streakDays: number;
  lastActivity?: string;
  createdAt: string;
  isActive: boolean;
}

// Language Hierarchy Types
export interface Language {
  id: string;
  name: string;
  code: string; // ISO language code (en, fr, es, etc.)
  flag?: string;
  description?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  domains: Domain[];
  totalDomains: number;
  totalLessons: number;
  totalWords: number;
  enrolledUsers: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Domain {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  languageId: string;
  language?: Language;
  lessons: Lesson[];
  totalLessons: number;
  totalWords: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content?: string;
  domainId: string;
  domain?: Domain;
  words: Word[];
  totalWords: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
  order: number;
  objectives: string[];
  prerequisites?: string[];
  isPublished: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  id: string;
  text: string;
  translation: string;
  pronunciation?: string;
  audioUrl?: string;
  imageUrl?: string;
  example?: string;
  exampleTranslation?: string;
  lessonId: string;
  lesson?: Lesson;
  partOfSpeech:
    | "noun"
    | "verb"
    | "adjective"
    | "adverb"
    | "pronoun"
    | "preposition"
    | "conjunction"
    | "interjection";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  synonyms: string[];
  antonyms: string[];
  order: number;
  timesLearned: number;
  successRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Request/Response Types for CRUD operations
export interface CreateLanguageRequest {
  name: string;
  code: string;
  description?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  flag?: string;
}

export interface CreateDomainRequest {
  name: string;
  description?: string;
  icon?: string;
  languageId: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  order: number;
}

export interface CreateLessonRequest {
  title: string;
  description?: string;
  content?: string;
  domainId: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  order: number;
  objectives: string[];
  prerequisites?: string[];
}

export interface CreateWordRequest {
  text: string;
  translation: string;
  pronunciation?: string;
  audioUrl?: string;
  imageUrl?: string;
  example?: string;
  exampleTranslation?: string;
  lessonId: string;
  partOfSpeech:
    | "noun"
    | "verb"
    | "adjective"
    | "adverb"
    | "pronoun"
    | "preposition"
    | "conjunction"
    | "interjection";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  synonyms: string[];
  antonyms: string[];
  order: number;
}

export interface CreateParentRequest {
  email: string;
  name: string;
  phone?: string;
  password: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filter?: Record<string, any>;
}

// Swagger Integration Types
export interface SwaggerSpec {
  openapi?: string; // OpenAPI 3.x
  swagger?: string; // Swagger 2.x
  info: {
    title: string;
    version: string;
    description: string;
  };
  servers?: Array<{
    url: string;
    description: string;
  }>;
  paths: Record<string, any>;
  components?: {
    schemas: Record<string, any>;
    securitySchemes: Record<string, any>;
  };
}
