/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminLoginPayload } from '../models/AdminLoginPayload';
import type { AdminProfile } from '../models/AdminProfile';
import type { AdminStatistics } from '../models/AdminStatistics';
import type { User } from '../models/User';
import type { UserLoginPayload } from '../models/UserLoginPayload';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Register a new user (parent or admin)
     * @returns any User created successfully
     * @throws ApiError
     */
    public static postApiAuthSignup({
        requestBody,
    }: {
        requestBody: {
            name: string;
            email: string;
            password: string;
            phone: string;
        },
    }): CancelablePromise<{
        successmessage?: string;
        user?: User;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * User login
     * @returns any Login success
     * @throws ApiError
     */
    public static postApiAuthSignin({
        requestBody,
    }: {
        requestBody: {
            email: string;
            password: string;
        },
    }): CancelablePromise<{
        message?: string;
        user?: UserLoginPayload;
        token?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signin',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Admin login
     * Login endpoint specifically for admin users. Only users with admin role can use this endpoint.
     * @returns any Admin login successful
     * @throws ApiError
     */
    public static postApiAuthSigninAdmin({
        requestBody,
    }: {
        requestBody: {
            email: string;
            password: string;
        },
    }): CancelablePromise<{
        message?: string;
        token?: string;
        user?: AdminLoginPayload;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signin-admin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid credentials`,
                403: `Access denied - not an admin`,
            },
        });
    }
    /**
     * Get admin profile
     * Fetch the authenticated admin's profile with statistics. Requires admin authentication.
     * @returns any Admin profile retrieved successfully
     * @throws ApiError
     */
    public static getApiAuthAdminProfile(): CancelablePromise<{
        message?: string;
        admin?: AdminProfile;
        statistics?: AdminStatistics;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/admin-profile',
            errors: {
                403: `Access denied - admin privileges required`,
            },
        });
    }
    /**
     * Get parent profile
     * @returns any Parent profile retrieved
     * @throws ApiError
     */
    public static getApiAuthParentProfile(): CancelablePromise<{
        parent?: (User & {
            hasChildren?: boolean;
        });
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/parent-profile',
        });
    }
}
