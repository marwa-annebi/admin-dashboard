/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lesson } from '../models/Lesson';
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
     * Get active lessons
     * List active lessons with optional filters and pagination.
     * @returns any Lessons retrieved
     * @throws ApiError
     */
    public static getApiLesson1({
        domainId,
        difficulty,
        search,
        page = 1,
        limit = 20,
    }: {
        domainId?: string,
        difficulty?: 'easy' | 'medium' | 'hard',
        search?: string,
        page?: number,
        limit?: number,
    }): CancelablePromise<{
        message?: string;
        data?: Array<Lesson>;
        totalCount?: number;
        page?: number;
        limit?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson',
            query: {
                'domainId': domainId,
                'difficulty': difficulty,
                'search': search,
                'page': page,
                'limit': limit,
            },
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
