/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Language } from './Language';
export type LanguageProgressSummary = {
    totalLanguages?: number;
    currentLanguage?: Language;
    languageProgress?: Array<{
        language?: Language;
        progress?: number;
        totalScore?: number;
        totalLessons?: number;
        completedLessons?: number;
    }>;
};

