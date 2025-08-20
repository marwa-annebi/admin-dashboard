/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Sentence } from '../models/Sentence';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminSentenceManagementService {
    /**
     * Get sentences (Admin only)
     * List sentences with optional filters and pagination. Admin privileges required.
     * @returns any Sentences retrieved successfully
     * @throws ApiError
     */
    public static getApiSentencesAdmin({
        lessonId,
        baseWordId,
        search,
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        domainId,
    }: {
        /**
         * Filter by lesson ID
         */
        lessonId?: string,
        /**
         * Filter by base word ID
         */
        baseWordId?: string,
        /**
         * Search by text (case-insensitive)
         */
        search?: string,
        page?: number,
        limit?: number,
        sortBy?: string,
        sortOrder?: 'asc' | 'desc',
        /**
         * Filter by domain ID
         */
        domainId?: string,
    }): CancelablePromise<{
        successmessage?: string;
        data?: Array<Sentence>;
        totalCount?: number;
        page?: number;
        limit?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sentences/admin',
            query: {
                'lessonId': lessonId,
                'baseWordId': baseWordId,
                'search': search,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'domainId': domainId,
            },
            errors: {
                403: `Access denied - admin privileges required`,
            },
        });
    }
    /**
     * Create a sentence (Admin only)
     * @returns any Sentence created successfully
     * @throws ApiError
     */
    public static postApiSentencesAdmin({
        requestBody,
    }: {
        requestBody: {
            lessonId: string;
            text: string;
            phonetic?: string;
            audio?: string;
            baseWordId?: string;
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: Sentence;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sentences/admin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Access denied - admin privileges required`,
            },
        });
    }
    /**
     * Update a sentence (Admin only)
     * @returns any Sentence updated successfully
     * @throws ApiError
     */
    public static putApiSentencesAdmin({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            text?: string;
            phonetic?: string;
            audio?: string;
            baseWordId?: string;
            lessonId?: string;
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: Sentence;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/sentences/admin/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Sentence not found`,
            },
        });
    }
    /**
     * Delete a sentence (Admin only)
     * @returns any Sentence deleted successfully
     * @throws ApiError
     */
    public static deleteApiSentencesAdmin({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        successmessage?: string;
        data?: {
            _id?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/sentences/admin/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Sentence not found`,
            },
        });
    }
}
