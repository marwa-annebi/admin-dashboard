/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LessonContent } from '../models/LessonContent';
import type { LessonFinish } from '../models/LessonFinish';
import type { LessonReview } from '../models/LessonReview';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LessonService {
    /**
     * Get lesson content
     * @returns LessonContent Lesson content retrieved
     * @throws ApiError
     */
    public static getApiLesson({
        domainId,
        lessonNumber,
    }: {
        domainId: string,
        lessonNumber: number,
    }): CancelablePromise<LessonContent> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson/{domainId}/{lessonNumber}',
            path: {
                'domainId': domainId,
                'lessonNumber': lessonNumber,
            },
        });
    }
    /**
     * Get lesson review
     * @returns LessonReview Lesson review retrieved
     * @throws ApiError
     */
    public static getApiLessonReview(): CancelablePromise<LessonReview> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson/review',
        });
    }
    /**
     * Finish a lesson
     * @returns any Lesson finished
     * @throws ApiError
     */
    public static postApiLessonFinish({
        requestBody,
    }: {
        requestBody: LessonFinish,
    }): CancelablePromise<{
        message?: string;
        score?: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/lesson/finish',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Finish a sentence lesson
     * @returns any Sentence lesson finished
     * @throws ApiError
     */
    public static postApiLessonFinishSentence({
        requestBody,
    }: {
        requestBody: LessonFinish,
    }): CancelablePromise<{
        message?: string;
        score?: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/lesson/finish-sentence',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reset lesson score
     * @returns any Score reset
     * @throws ApiError
     */
    public static postApiLessonResetScore(): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/lesson/reset-score',
        });
    }
}
