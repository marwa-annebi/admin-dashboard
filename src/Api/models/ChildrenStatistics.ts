/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChildrenStatistics = {
    /**
     * Total number of children in the system
     */
    totalChildren?: number;
    /**
     * Children grouped by age ranges (3-5, 6-8, 9-12, 13-18)
     */
    childrenByAge?: Array<{
        /**
         * Age group range
         */
        _id?: string;
        /**
         * Number of children in this age group
         */
        count?: number;
    }>;
    /**
     * Number of children who have completed their profile information
     */
    completedInfo?: number;
    /**
     * Number of children who haven't completed their profile information
     */
    incompleteInfo?: number;
    /**
     * Number of children who are first-time users
     */
    firstTimeLogins?: number;
    /**
     * Number of children who are returning users
     */
    returningUsers?: number;
};

