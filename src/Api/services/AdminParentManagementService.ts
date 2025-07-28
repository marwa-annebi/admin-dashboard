/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeletedParentInfo } from '../models/DeletedParentInfo';
import type { ParentProfile } from '../models/ParentProfile';
import type { ParentWithChildren } from '../models/ParentWithChildren';
import type { ParentWithDetails } from '../models/ParentWithDetails';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminParentManagementService {
    /**
     * Get all parents (Admin only)
     * Retrieve all parent users with their children count. Admin privileges required.
     * @returns any Parents retrieved successfully
     * @throws ApiError
     */
    public static getApiUserParents(): CancelablePromise<{
        successmessage?: string;
        data?: Array<ParentWithChildren>;
        totalCount?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/parents',
            errors: {
                403: `Access denied - admin privileges required`,
            },
        });
    }
    /**
     * Create new parent (Admin only)
     * Create a new parent user. Admin privileges required.
     * @returns any Parent created successfully
     * @throws ApiError
     */
    public static postApiUserParents({
        requestBody,
    }: {
        requestBody: {
            name: string;
            email: string;
            password: string;
            phone?: string;
            /**
             * 4-6 digit PIN for child security
             */
            parentPin: string;
            /**
             * Interface language preference
             */
            preferredLanguage?: 'en' | 'fr';
            /**
             * Country of residence
             */
            country?: string;
            /**
             * User's timezone
             */
            timezone?: string;
            /**
             * Subscription status
             */
            subscriptionStatus?: 'free' | 'premium' | 'trial';
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: ParentProfile;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/parents',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                403: `Access denied - admin privileges required`,
            },
        });
    }
    /**
     * Get single parent (Admin only)
     * Get detailed information about a specific parent including their children. Admin privileges required.
     * @returns any Parent retrieved successfully
     * @throws ApiError
     */
    public static getApiUserParents1({
        id,
    }: {
        /**
         * The parent ID
         */
        id: string,
    }): CancelablePromise<{
        successmessage?: string;
        data?: ParentWithDetails;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/parents/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Parent not found`,
            },
        });
    }
    /**
     * Update parent (Admin only)
     * Update parent information. Admin privileges required.
     * @returns any Parent updated successfully
     * @throws ApiError
     */
    public static putApiUserParents({
        id,
        requestBody,
    }: {
        /**
         * The parent ID
         */
        id: string,
        requestBody: {
            name?: string;
            email?: string;
            phone?: string;
            /**
             * Optional - only include if changing password
             */
            password?: string;
            /**
             * Optional - activate or deactivate the parent account
             */
            isActive?: boolean;
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: ParentProfile;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/parents/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                403: `Access denied - admin privileges required`,
                404: `Parent not found`,
            },
        });
    }
    /**
     * Delete parent (Admin only)
     * Delete a parent and all their children from the system. This action is irreversible. Admin privileges required.
     * @returns any Parent deleted successfully
     * @throws ApiError
     */
    public static deleteApiUserParents({
        id,
    }: {
        /**
         * The parent ID to delete
         */
        id: string,
    }): CancelablePromise<{
        successmessage?: string;
        data?: {
            deletedParent?: DeletedParentInfo;
            /**
             * Number of children that were also deleted
             */
            deletedChildrenCount?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user/parents/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Parent not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Activate parent account (Admin only)
     * Activate a deactivated parent account. Admin privileges required.
     * @returns any Parent activated successfully
     * @throws ApiError
     */
    public static patchApiUserParentsActivate({
        id,
    }: {
        /**
         * The parent ID to activate
         */
        id: string,
    }): CancelablePromise<{
        successmessage?: string;
        data?: ParentProfile;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user/parents/{id}/activate',
            path: {
                'id': id,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Parent not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Deactivate parent account (Admin only)
     * Deactivate a parent account. This will prevent the parent from logging in. Admin privileges required.
     * @returns any Parent deactivated successfully
     * @throws ApiError
     */
    public static patchApiUserParentsDeactivate({
        id,
    }: {
        /**
         * The parent ID to deactivate
         */
        id: string,
    }): CancelablePromise<{
        successmessage?: string;
        data?: ParentProfile;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user/parents/{id}/deactivate',
            path: {
                'id': id,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                404: `Parent not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get parents by status (Admin only)
     * Retrieve parents filtered by their active status. Admin privileges required.
     * @returns any Parents retrieved successfully
     * @throws ApiError
     */
    public static getApiUserParentsByStatus({
        status = 'all',
    }: {
        /**
         * Filter parents by status
         */
        status?: 'active' | 'inactive' | 'all',
    }): CancelablePromise<{
        successmessage?: string;
        data?: Array<ParentWithChildren>;
        statistics?: {
            totalCount?: number;
            activeCount?: number;
            inactiveCount?: number;
            requestedStatus?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/parents-by-status',
            query: {
                'status': status,
            },
            errors: {
                403: `Access denied - admin privileges required`,
                500: `Server error`,
            },
        });
    }
}
