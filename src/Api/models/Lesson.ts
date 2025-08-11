/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Domain } from './Domain';
export type Lesson = {
    _id?: string;
    title?: string;
    description?: string;
    domain?: Domain;
    difficulty?: Lesson.difficulty;
    isActive?: boolean;
    order?: number;
    createdAt?: string;
    updatedAt?: string;
};
export namespace Lesson {
    export enum difficulty {
        EASY = 'easy',
        MEDIUM = 'medium',
        HARD = 'hard',
    }
}

