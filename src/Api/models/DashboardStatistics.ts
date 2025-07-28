/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DashboardStatistics = {
    totalParents?: {
        /**
         * Total number of parents in the system
         */
        count?: number;
        /**
         * Monthly percentage change in parent count
         */
        percentageChange?: number;
        /**
         * Whether the percentage change is positive or negative
         */
        isPositive?: boolean;
        /**
         * Number of new parents added this month
         */
        newThisMonth?: number;
    };
    totalChildren?: {
        /**
         * Total number of children in the system
         */
        count?: number;
        /**
         * Monthly percentage change in children count
         */
        percentageChange?: number;
        /**
         * Whether the percentage change is positive or negative
         */
        isPositive?: boolean;
        /**
         * Number of new children added this month
         */
        newThisMonth?: number;
    };
    totalLanguages?: {
        /**
         * Total number of languages available
         */
        count?: number;
        /**
         * Number of new languages added this month
         */
        newThisMonth?: number;
    };
    totalWords?: {
        /**
         * Total number of words in the system
         */
        count?: number;
        /**
         * Number of new words added this month
         */
        newThisMonth?: number;
    };
    totalLessons?: {
        /**
         * Total number of lessons available
         */
        count?: number;
        /**
         * Number of new lessons added this month
         */
        newThisMonth?: number;
    };
    totalDomains?: {
        /**
         * Total number of learning domains available
         */
        count?: number;
        /**
         * Number of new domains added this month
         */
        newThisMonth?: number;
    };
};

