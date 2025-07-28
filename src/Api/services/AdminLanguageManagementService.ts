/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeletedLanguageInfo } from '../models/DeletedLanguageInfo';
import type { Language } from '../models/Language';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminLanguageManagementService {
    /**
     * Create new language (Admin only)
     * Create a new language in the system. Admin privileges required.
     * @returns any Language created successfully
     * @throws ApiError
     */
    public static postApiLanguages({
        requestBody,
    }: {
        requestBody: {
            /**
             * Language code (will be converted to uppercase)
             */
            code: string;
            /**
             * Language name
             */
            name: string;
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: Language;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/languages',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data or language already exists`,
                403: `Access denied - admin privileges required`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get single language (Admin only)
     * Get detailed information about a specific language. Admin privileges required.
     * @returns any Language retrieved successfully
     * @throws ApiError
     */
    public static getApiLanguages({
        id,
    }: {
        /**
         * The language ID
         */
        id: string,
    }): CancelablePromise<{
        successmessage?: string;
        data?: Language;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/languages/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid language ID format`,
                403: `Access denied - admin privileges required`,
                404: `Language not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Update language (Admin only)
     * Update language information. Admin privileges required.
     * @returns any Language updated successfully
     * @throws ApiError
     */
    public static putApiLanguages({
        id,
        requestBody,
    }: {
        /**
         * The language ID
         */
        id: string,
        requestBody: {
            /**
             * Language code (will be converted to uppercase)
             */
            code?: string;
            /**
             * Language name
             */
            name?: string;
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: Language;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/languages/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data or duplicate code`,
                403: `Access denied - admin privileges required`,
                404: `Language not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Delete language (Admin only)
     * Delete a language from the system. This action is irreversible. Admin privileges required.
     * @returns any Language deleted successfully
     * @throws ApiError
     */
    public static deleteApiLanguages({
        id,
    }: {
        /**
         * The language ID to delete
         */
        id: string,
    }): CancelablePromise<{
        successmessage?: string;
        data?: {
            deletedLanguage?: DeletedLanguageInfo;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/languages/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid language ID format`,
                403: `Access denied - admin privileges required`,
                404: `Language not found`,
                500: `Server error`,
            },
        });
    }
}
