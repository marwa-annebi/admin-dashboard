/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Child } from '../models/Child';
import type { ChildLanguageInfo } from '../models/ChildLanguageInfo';
import type { Language } from '../models/Language';
import type { LanguageProgressSummary } from '../models/LanguageProgressSummary';
import type { ScoreHistory } from '../models/ScoreHistory';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChildService {
    /**
     * Add a child to a parent
     * @returns any Child added
     * @throws ApiError
     */
    public static postApiChildrenAddChild({
        requestBody,
    }: {
        requestBody: {
            name: string;
            age: number;
        },
    }): CancelablePromise<{
        message?: string;
        child?: Child;
        token?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/children/add-child',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all children for a parent (with optional name search)
     * Returns all children for a parent. Optionally, filter children by name using the 'search' query parameter (case-insensitive).
     *
     * @returns any List of children
     * @throws ApiError
     */
    public static getApiChildren({
        search,
    }: {
        /**
         * Filter children by name (case-insensitive, partial match)
         */
        search?: string,
    }): CancelablePromise<{
        children?: Array<Child>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/children',
            query: {
                'search': search,
            },
        });
    }
    /**
     * Delete a child
     * @returns any Child deleted
     * @throws ApiError
     */
    public static deleteApiChildren({
        childId,
    }: {
        childId: string,
    }): CancelablePromise<{
        message?: string;
        children?: Array<Child>;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/children/{childId}',
            path: {
                'childId': childId,
            },
        });
    }
    /**
     * Login a child
     * @returns any Child logged in
     * @throws ApiError
     */
    public static postApiChildrenLogin({
        requestBody,
    }: {
        requestBody: {
            childId: string;
        },
    }): CancelablePromise<{
        message?: string;
        token?: string;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/children/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update child settings
     * @returns any Child settings updated
     * @throws ApiError
     */
    public static putApiChildrenSettings({
        childId,
        formData,
    }: {
        childId: string,
        formData: {
            /**
             * Avatar image file (jpg, png, gif, etc.)
             */
            avatar?: Blob;
            /**
             * Selected language ID
             */
            selectedLanguage?: string;
            /**
             * Whether this is the child's first login
             */
            isFirstLogin?: boolean;
        },
    }): CancelablePromise<{
        message?: string;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/children/{childId}/settings',
            path: {
                'childId': childId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Update child avatar
     * @returns any Child avatar updated
     * @throws ApiError
     */
    public static putApiChildrenAvatar({
        childId,
        formData,
    }: {
        childId: string,
        formData: {
            /**
             * Avatar image file (jpg, png, gif, etc.)
             */
            avatar: Blob;
        },
    }): CancelablePromise<{
        message?: string;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/children/{childId}/avatar',
            path: {
                'childId': childId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Get children leaderboard
     * @returns any Leaderboard retrieved
     * @throws ApiError
     */
    public static getApiChildrenLeaderboard({
        period = 'all',
    }: {
        /**
         * Time period for leaderboard (today, month, or all)
         */
        period?: 'today' | 'month' | 'all',
    }): CancelablePromise<Array<{
        name?: string;
        avatar?: string;
        score?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/children/leaderboard',
            query: {
                'period': period,
            },
        });
    }
    /**
     * Get current child profile (requires child token)
     * @returns any Child profile retrieved
     * @throws ApiError
     */
    public static getApiChildrenMe(): CancelablePromise<{
        id?: string;
        name?: string;
        avatar?: string;
        level?: string;
        score?: number;
        selectedLanguage?: string;
        progress?: number;
        isFirstLogin?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/children/me',
        });
    }
    /**
     * Get child progress (requires child token)
     * @returns any Child progress retrieved
     * @throws ApiError
     */
    public static getApiChildrenProgress(): CancelablePromise<{
        score?: number;
        progress?: number;
        currentLevel?: string;
        scoreHistory?: Array<ScoreHistory>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/children/progress',
        });
    }
    /**
     * Reset lesson score for a child
     * @returns any Lesson score reset successfully
     * @throws ApiError
     */
    public static postApiChildrenResetLessonScore({
        requestBody,
    }: {
        requestBody: {
            childId: string;
            domain: string;
            lessonNumber: number;
        },
    }): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/children/reset-lesson-score',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update child progress
     * @returns any Child progress updated
     * @throws ApiError
     */
    public static putApiChildrenProgress({
        childId,
        requestBody,
    }: {
        childId: string,
        requestBody: {
            score?: number;
            progress?: number;
            currentLevel?: string;
        },
    }): CancelablePromise<{
        message?: string;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/children/{childId}/progress',
            path: {
                'childId': childId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Select domain for child
     * @returns any Domain selected successfully
     * @throws ApiError
     */
    public static postApiChildrenSelectDomain({
        childId,
        requestBody,
    }: {
        childId: string,
        requestBody: {
            languageId: string;
            domainId: string;
        },
    }): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/children/{childId}/select-domain',
            path: {
                'childId': childId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get child's languages
     * @returns any Child languages retrieved
     * @throws ApiError
     */
    public static getApiChildrenLanguages({
        childId,
    }: {
        childId: string,
    }): CancelablePromise<{
        languages?: Array<ChildLanguageInfo>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/children/{childId}/languages',
            path: {
                'childId': childId,
            },
        });
    }
    /**
     * Add learning language to child
     * @returns any Learning language added
     * @throws ApiError
     */
    public static postApiChildrenLanguages({
        childId,
        requestBody,
    }: {
        childId: string,
        requestBody: {
            languageId: string;
        },
    }): CancelablePromise<{
        message?: string;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/children/{childId}/languages',
            path: {
                'childId': childId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove learning language from child
     * @returns any Learning language removed
     * @throws ApiError
     */
    public static deleteApiChildrenLanguages({
        childId,
        languageId,
    }: {
        childId: string,
        languageId: string,
    }): CancelablePromise<{
        message?: string;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/children/{childId}/languages/{languageId}',
            path: {
                'childId': childId,
                'languageId': languageId,
            },
        });
    }
    /**
     * Set primary language for child
     * @returns any Primary language set
     * @throws ApiError
     */
    public static putApiChildrenPrimaryLanguage({
        childId,
        requestBody,
    }: {
        childId: string,
        requestBody: {
            languageId: string;
        },
    }): CancelablePromise<{
        message?: string;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/children/{childId}/primary-language',
            path: {
                'childId': childId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get available languages for child
     * @returns any Available languages retrieved
     * @throws ApiError
     */
    public static getApiChildrenAvailableLanguages({
        childId,
    }: {
        childId: string,
    }): CancelablePromise<{
        availableLanguages?: Array<Language>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/children/{childId}/available-languages',
            path: {
                'childId': childId,
            },
        });
    }
    /**
     * Update child's current domain
     * @returns any Current domain updated
     * @throws ApiError
     */
    public static putApiChildrenCurrentDomain({
        childId,
        requestBody,
    }: {
        childId: string,
        requestBody: {
            domainId: string;
        },
    }): CancelablePromise<{
        message?: string;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/children/{childId}/current-domain',
            path: {
                'childId': childId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get child's language progress summary
     * @returns any Language progress summary retrieved
     * @throws ApiError
     */
    public static getApiChildrenLanguageProgress({
        childId,
    }: {
        childId: string,
    }): CancelablePromise<{
        summary?: LanguageProgressSummary;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/children/{childId}/language-progress',
            path: {
                'childId': childId,
            },
        });
    }
    /**
     * Get child's current language
     * @returns any Current language retrieved
     * @throws ApiError
     */
    public static getApiChildrenCurrentLanguage({
        childId,
    }: {
        childId: string,
    }): CancelablePromise<{
        currentLanguage?: Language;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/children/{childId}/current-language',
            path: {
                'childId': childId,
            },
        });
    }
    /**
     * Set child's current language
     * @returns any Current language set
     * @throws ApiError
     */
    public static putApiChildrenCurrentLanguage({
        childId,
        requestBody,
    }: {
        childId: string,
        requestBody: {
            languageId: string;
        },
    }): CancelablePromise<{
        message?: string;
        child?: Child;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/children/{childId}/current-language',
            path: {
                'childId': childId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
