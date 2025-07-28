/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Child } from '../models/Child';
import type { Language } from '../models/Language';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LanguageService {
    /**
     * Get all languages (Admin only)
     * Retrieve all available languages in the system. Admin privileges required.
     * @returns Language Languages retrieved successfully
     * @throws ApiError
     */
    public static getApiLanguages(): CancelablePromise<Array<Language>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/languages',
            errors: {
                403: `Access denied - admin privileges required`,
                500: `Server error`,
            },
        });
    }
    /**
     * Select a language for a child
     * @returns any Language selected
     * @throws ApiError
     */
    public static postApiLanguagesSelect({
        requestBody,
    }: {
        requestBody: {
            childId: string;
            languageId: string;
        },
    }): CancelablePromise<{
        message?: string;
        token?: string;
        selectedLanguage?: Language;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/languages/select',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
