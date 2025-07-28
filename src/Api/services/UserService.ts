/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Update user avatar
     * Update the authenticated user's avatar. Requires valid JWT token.
     * @returns any Avatar updated successfully
     * @throws ApiError
     */
    public static putApiUserAvatar({
        requestBody,
    }: {
        requestBody: {
            /**
             * Avatar filename or URL
             */
            avatar: string;
        },
    }): CancelablePromise<{
        successmessage?: string;
        data?: User;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/avatar',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing avatar data`,
                404: `User not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Verify parent PIN
     * Verify the parent's PIN code for security purposes. Requires valid JWT token.
     * @returns any PIN code is valid
     * @throws ApiError
     */
    public static postApiUserVerifyParentPin({
        requestBody,
    }: {
        requestBody: {
            /**
             * The parent user ID
             */
            userId: string;
            /**
             * The parent's PIN code
             */
            pin: string;
        },
    }): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/verify-parent-pin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing parameters`,
                401: `Invalid PIN code`,
                404: `User or PIN not found`,
                500: `Server error`,
            },
        });
    }
}
