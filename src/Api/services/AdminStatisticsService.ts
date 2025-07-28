/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChildrenStatistics } from '../models/ChildrenStatistics';
import type { DashboardStatistics } from '../models/DashboardStatistics';
import type { ParentStatistics } from '../models/ParentStatistics';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminStatisticsService {
    /**
     * Get dashboard statistics (Admin only)
     * Retrieve main dashboard statistics including total parents, children, languages, and words with monthly growth metrics. Admin privileges required.
     * @returns any Dashboard statistics retrieved successfully
     * @throws ApiError
     */
    public static getApiStatisticsDashboard(): CancelablePromise<{
        successmessage?: string;
        data?: DashboardStatistics;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/statistics/dashboard',
            errors: {
                403: `Access denied - admin privileges required`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get detailed parent statistics (Admin only)
     * Retrieve detailed statistics about parents including active/inactive counts and parents with/without children. Admin privileges required.
     * @returns any Parent statistics retrieved successfully
     * @throws ApiError
     */
    public static getApiStatisticsParents(): CancelablePromise<{
        successmessage?: string;
        data?: ParentStatistics;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/statistics/parents',
            errors: {
                403: `Access denied - admin privileges required`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get detailed children statistics (Admin only)
     * Retrieve detailed statistics about children including age groups, completion status, and login statistics. Admin privileges required.
     * @returns any Children statistics retrieved successfully
     * @throws ApiError
     */
    public static getApiStatisticsChildren(): CancelablePromise<{
        successmessage?: string;
        data?: ChildrenStatistics;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/statistics/children',
            errors: {
                403: `Access denied - admin privileges required`,
                500: `Server error`,
            },
        });
    }
}
