/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Word } from "../models/Word";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminWordManagementService {
  /**
   * Create a word in a specific lesson (Admin only)
   * @returns any Word created successfully
   * @throws ApiError
   */
  public static postApiAuthAdminProfile({
    formData,
  }: {
    formData: {
      lessonId: string;
      word: string;
      sentence?: string;
      images?: Array<Blob>;
    };
  }): CancelablePromise<{
    successmessage?: string;
    data?: Word;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/auth/admin-profile",
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        400: `Invalid input`,
        403: `Access denied - admin privileges required`,
        404: `Lesson not found`,
      },
    });
  }
  /**
   * Get words (Admin only)
   * List words with optional filters and pagination. Admin privileges required.
   * @returns any Words retrieved successfully
   * @throws ApiError
   */
  public static getApiWordsAdmin({
    difficulty,
    lessonId,
    search,
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    sortOrder = "desc",
    domainId,
  }: {
    difficulty?: "easy" | "medium" | "hard";
    /**
     * Filter by lesson ID
     */
    lessonId?: string;
    /**
     * Search by word or sentence (case-insensitive)
     */
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    /**
     * Filter by domain ID
     */
    domainId?: string;
  }): CancelablePromise<{
    successmessage?: string;
    data?: Array<Word>;
    totalCount?: number;
    page?: number;
    limit?: number;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/words/admin",
      query: {
        difficulty: difficulty,
        lessonId: lessonId,
        search: search,
        page: page,
        limit: limit,
        sortBy: sortBy,
        sortOrder: sortOrder,
        domainId: domainId,
      },
      errors: {
        403: `Access denied - admin privileges required`,
      },
    });
  }
  /**
   * Create a word (Admin only)
   * @returns any Word created successfully
   * @throws ApiError
   */
  public static postApiWordsAdmin({
    formData,
  }: {
    formData: {
      lessonId: string;
      word: string;
      sentence?: string;
      phonetic?: string;
      images?: Array<Blob>;
    };
  }): CancelablePromise<{
    successmessage?: string;
    data?: Word;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/words/admin",
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        400: `Invalid input`,
        403: `Access denied - admin privileges required`,
        404: `Lesson not found`,
      },
    });
  }
  /**
   * Create a word in a specific lesson (Admin only)
   * @returns any Word created successfully
   * @throws ApiError
   */
  public static postApiParagraphsAdmin({
    formData,
  }: {
    formData: {
      lessonId: string;
      word: string;
      sentence?: string;
      images?: Array<Blob>;
    };
  }): CancelablePromise<{
    successmessage?: string;
    data?: Word;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/paragraphs/admin/{id}",
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        400: `Invalid input`,
        403: `Access denied - admin privileges required`,
        404: `Lesson not found`,
      },
    });
  }
  /**
   * Bulk create a word across all languages (Admin only)
   * Creates the same word in all equivalent lessons across languages, matched by domain name, order, and difficulty of the source lesson.
   * @returns any Bulk word creation completed
   * @throws ApiError
   */
  public static postApiWordsAdminBulk({
    formData,
  }: {
    formData: {
      /**
       * Source lesson ID used to find equivalent lessons across domains/languages
       */
      lessonId: string;
      word: string;
      sentence?: string;
      images?: Array<Blob>;
    };
  }): CancelablePromise<{
    successmessage?: string;
    createdCount?: number;
    skipped?: Array<{
      domainId?: string;
      reason?: string;
    }>;
    data?: Array<Word>;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/words/admin/bulk",
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        400: `Invalid input`,
        403: `Access denied - admin privileges required`,
        404: `Source lesson not found`,
      },
    });
  }
  /**
   * Get a word by ID (Admin only)
   * @returns any Word retrieved successfully
   * @throws ApiError
   */
  public static getApiWordsAdmin1({ id }: { id: string }): CancelablePromise<{
    successmessage?: string;
    data?: Word;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/words/admin/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Access denied - admin privileges required`,
        404: `Word not found`,
      },
    });
  }
  /**
   * Update a word (Admin only)
   * @returns any Word updated successfully
   * @throws ApiError
   */
  public static putApiWordsAdmin({
    id,
    formData,
  }: {
    id: string;
    formData: {
      lessonId?: string;
      word?: string;
      sentence?: string;
      phonetic?: string;
      difficulty?: "easy" | "medium" | "hard";
      wordAudio?: string;
      sentencePhonetic?: string;
      sentenceDifficulty?: "Easy" | "Medium" | "Hard";
      sentenceAudio?: string;
      /**
       * Set to 'true' to replace all existing images with the uploaded ones; otherwise uploaded images are appended
       */
      replaceImages?: string;
      images?: Array<Blob>;
    };
  }): CancelablePromise<{
    successmessage?: string;
    data?: Word;
  }> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/words/admin/{id}",
      path: {
        id: id,
      },
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        403: `Access denied - admin privileges required`,
        404: `Word not found`,
      },
    });
  }
  /**
   * Delete a word (Admin only)
   * @returns any Word deleted successfully
   * @throws ApiError
   */
  public static deleteApiWordsAdmin({ id }: { id: string }): CancelablePromise<{
    successmessage?: string;
    data?: {
      _id?: string;
    };
  }> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/words/admin/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Access denied - admin privileges required`,
        404: `Word not found`,
      },
    });
  }
}
