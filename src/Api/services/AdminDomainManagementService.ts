/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Domain } from '../models/Domain';
import type { Language } from '../models/Language';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminDomainManagementService {
    /**
     * Get all domains (Admin only)
     * Retrieve all learning domains in the system with their associated languages. Admin privileges required.
     * @returns any List of all domains retrieved successfully
     * @throws ApiError
     */
    public static getApiDomainesAll({
        name,
        filterLanguage,
    }: {
        /**
         * Filter domains by name
         */
        name?: string,
        /**
         * Filter domains by language
         */
        filterLanguage?: string,
    }): CancelablePromise<{
        successmessage?: string;
        data?: Array<(Domain & {
            language?: Language;
        })>;
        /**
         * Total number of domains
         */
        totalCount?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/domaines/all',
            query: {
                'name': name,
                'filterLanguage': filterLanguage,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                500: `Server error`,
            },
        });
    }
    /**
     * Create new domain (Admin only)
     * Create a new learning domain in the system. Admin privileges required.
     * @returns any Domain created successfully
     * @throws ApiError
     */
    public static postApiDomaines({
        formData,
    }: {
        formData: {
            /**
             * Domain name
             */
            name: string;
            /**
             * Language code (EN, FR, etc.)
             */
            languageCode: string;
            /**
             * Domain description (optional)
             */
            description?: string;
            /**
             * Domain image file upload (optional) - JPG, PNG, GIF supported, max 5MB
             */
            image?: Blob;
            /**
             * Number of lessons in domain (optional)
             */
            lessonCount?: number;
        },
    }): CancelablePromise<{
        _id?: string;
        name?: string;
        /**
         * Language ObjectId reference
         */
        language?: string;
        createdAt?: string;
        updatedAt?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/domaines',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Invalid input data`,
                403: `Access denied - admin privileges required`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get single domain (Admin only)
     * Retrieve detailed information about a specific learning domain. Admin privileges required.
     * @returns any Domain retrieved successfully
     * @throws ApiError
     */
    public static getApiDomaines({
        id,
    }: {
        /**
         * The domain ID
         */
        id: string,
    }): CancelablePromise<{
        _id?: string;
        name?: string;
        language?: Language;
        description?: string;
        image?: string;
        lessonCount?: number;
        availableLevels?: Array<'easy' | 'medium' | 'hard'>;
        order?: number;
        isActive?: boolean;
        createdAt?: string;
        updatedAt?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/domaines/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Domain not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Update domain (Admin only)
     * Update domain information including name and language. Admin privileges required.
     * @returns any Domain updated successfully
     * @throws ApiError
     */
    public static putApiDomaines({
        id,
        formData,
    }: {
        /**
         * The domain ID to update
         */
        id: string,
        formData: {
            /**
             * Domain name (optional for updates)
             */
            name?: string;
            /**
             * Language code (optional for updates)
             */
            languageCode?: string;
            /**
             * Domain description (optional for updates)
             */
            description?: string;
            /**
             * Domain image file upload (optional for updates) - JPG, PNG, GIF supported, max 5MB
             */
            image?: Blob;
            /**
             * Number of lessons in domain (optional for updates)
             */
            lessonCount?: number;
            /**
             * Whether domain is active (optional for updates)
             */
            isActive?: boolean;
        },
    }): CancelablePromise<{
        _id?: string;
        name?: string;
        /**
         * Language ObjectId reference
         */
        language?: string;
        description?: string;
        image?: string;
        lessonCount?: number;
        availableLevels?: Array<'easy' | 'medium' | 'hard'>;
        order?: number;
        isActive?: boolean;
        createdAt?: string;
        updatedAt?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/domaines/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Invalid input data`,
                403: `Access denied - admin privileges required`,
                404: `Domain not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Delete domain (Admin only)
     * Delete a learning domain from the system. This action is irreversible. Admin privileges required.
     * @returns any Domain deleted successfully
     * @throws ApiError
     */
    public static deleteApiDomaines({
        id,
    }: {
        /**
         * The domain ID to delete
         */
        id: string,
    }): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/domaines/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Domain not found`,
                500: `Server error`,
            },
        });
    }
}
