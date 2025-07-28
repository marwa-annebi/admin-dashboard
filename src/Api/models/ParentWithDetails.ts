/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ParentProfile } from './ParentProfile';
export type ParentWithDetails = (ParentProfile & {
    children?: Array<{
        _id?: string;
        name?: string;
        age?: number;
        avatar?: string;
        selectedLanguage?: string;
        score?: number;
        createdAt?: string;
        isActive?: boolean;
    }>;
    childrenCount?: number;
    /**
     * Combined score of all children
     */
    totalChildrenScore?: number;
});

