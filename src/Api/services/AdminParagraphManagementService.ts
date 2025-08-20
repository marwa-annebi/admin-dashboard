/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paragraph } from '../models/Paragraph';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminParagraphManagementService {
    /**
     * Get paragraphs (Admin only)
     * List paragraphs with optional filters and pagination. Admin privileges required.
     * @returns any Paragraphs retrieved successfully
     * @throws ApiError
     */
    public static getApiParagraphsAdmin({
        lessonId,
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
         * Search by textIncomplete (case-insensitive)
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
        data?: Array<Paragraph>;
        totalCount?: number;
        page?: number;
        limit?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/paragraphs/admin',
            query: {
                'lessonId': lessonId,
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
     * Create a paragraph (Admin only)
     * @returns any Paragraph created successfully
     * @throws ApiError
     */
    public static postApiSentencesAdmin({
        requestBody,
    }: {
        requestBody: {
            lessonId: string;
            textIncomplete: string;
            answersOrdered?: Array<string>;
            blankPositions?: Array<{
                start?: number;
                end?: number;
            }>;
            image?: string;
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: Paragraph;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sentences/admin/{id}',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Access denied - admin privileges required`,
            },
        });
    }
    /**
     * Update a paragraph (Admin only)
     * @returns any Paragraph updated successfully
     * @throws ApiError
     */
    public static putApiParagraphsAdmin({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            textIncomplete?: string;
            answersOrdered?: Array<string>;
            blankPositions?: Array<{
                start?: number;
                end?: number;
            }>;
            image?: string;
            lessonId?: string;
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: Paragraph;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/paragraphs/admin/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Paragraph not found`,
            },
        });
    }
    /**
     * Delete a paragraph (Admin only)
     * @returns any Paragraph deleted successfully
     * @throws ApiError
     */
    public static deleteApiParagraphsAdmin({
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
            url: '/api/paragraphs/admin/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Paragraph not found`,
            },
        });
    }
}
