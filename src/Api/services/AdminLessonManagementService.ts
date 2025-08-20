/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lesson } from '../models/Lesson';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminLessonManagementService {
    /**
     * Get lessons (Admin only)
     * List lessons with optional filters and pagination. Admin privileges required.
     * @returns any Lessons retrieved successfully
     * @throws ApiError
     */
    public static getApiLessonAdmin({
        domainId,
        difficulty,
        isActive,
        search,
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        type = 'all',
    }: {
        domainId?: string,
        difficulty?: 'easy' | 'medium' | 'hard',
        isActive?: boolean,
        /**
         * Search by title or description (case-insensitive)
         */
        search?: string,
        page?: number,
        limit?: number,
        sortBy?: string,
        sortOrder?: 'asc' | 'desc',
        type?: 'word' | 'sentence' | 'paragraph' | 'all',
    }): CancelablePromise<{
        successmessage?: string;
        data?: Array<Lesson>;
        totalCount?: number;
        page?: number;
        limit?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson/admin',
            query: {
                'domainId': domainId,
                'difficulty': difficulty,
                'isActive': isActive,
                'search': search,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'type': type,
            },
            errors: {
                403: `Access denied - admin privileges required`,
            },
        });
    }
    /**
     * Create a lesson (Admin only)
     * @returns any Lesson created successfully
     * @throws ApiError
     */
    public static postApiLessonAdmin({
        requestBody,
    }: {
        requestBody: {
            title: string;
            description?: string;
            domainId: string;
            difficulty: 'easy' | 'medium' | 'hard';
            /**
             * Optional. If not provided, auto-increment within domain+difficulty
             */
            order?: number;
            isActive?: boolean;
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: Lesson;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/lesson/admin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                403: `Access denied - admin privileges required`,
            },
        });
    }
}
