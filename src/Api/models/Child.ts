/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LanguageProgress } from './LanguageProgress';
import type { ScoreHistory } from './ScoreHistory';
export type Child = {
    _id?: string;
    name?: string;
    age?: number;
    avatar?: string;
    isFirstLogin?: boolean;
    parent?: string;
    languageProgress?: Array<LanguageProgress>;
    score?: number;
    scoreHistory?: Array<ScoreHistory>;
};

