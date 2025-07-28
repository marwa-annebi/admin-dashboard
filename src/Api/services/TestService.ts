/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Test } from '../models/Test';
import type { TestFinish } from '../models/TestFinish';
import type { TestHistory } from '../models/TestHistory';
import type { TestRecap } from '../models/TestRecap';
import type { TestStatistics } from '../models/TestStatistics';
import type { TestWords } from '../models/TestWords';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestService {
    /**
     * Get test words
     * @returns TestWords Test words retrieved
     * @throws ApiError
     */
    public static getApiTestsTestWords(): CancelablePromise<TestWords> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tests/test-words',
        });
    }
    /**
     * Check pronunciation
     * @returns any Pronunciation checked
     * @throws ApiError
     */
    public static postApiTestsCheckPronunciation({
        formData,
    }: {
        formData: {
            audio?: Blob;
        },
    }): CancelablePromise<{
        score?: number;
        feedback?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tests/check-pronunciation',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Finish a test
     * @returns any Test finished
     * @throws ApiError
     */
    public static postApiTestsFinish({
        requestBody,
    }: {
        requestBody: TestFinish,
    }): CancelablePromise<{
        message?: string;
        score?: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tests/finish',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get user test history
     * @returns TestHistory Test history retrieved
     * @throws ApiError
     */
    public static getApiTestsHistory(): CancelablePromise<Array<TestHistory>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tests/history',
        });
    }
    /**
     * Get recap for parent
     * @returns TestRecap Recap retrieved
     * @throws ApiError
     */
    public static getApiTestsRecap({
        childId,
    }: {
        childId: string,
    }): CancelablePromise<TestRecap> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tests/recap/{childId}',
            path: {
                'childId': childId,
            },
        });
    }
    /**
     * Get test by ID
     * @returns Test Test found
     * @throws ApiError
     */
    public static getApiTests({
        id,
    }: {
        id: string,
    }): CancelablePromise<Test> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tests/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get statistics by language
     * @returns TestStatistics Statistics retrieved
     * @throws ApiError
     */
    public static getApiTestsStatisticsByLanguage(): CancelablePromise<TestStatistics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tests/statistics-by-language',
        });
    }
}
