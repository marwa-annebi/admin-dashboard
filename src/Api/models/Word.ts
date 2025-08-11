/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lesson } from './Lesson';
export type Word = {
    _id?: string;
    word?: string;
    phonetic?: string;
    difficulty?: Word.difficulty;
    wordAudio?: string | null;
    images?: Array<string>;
    sentence?: string;
    sentencePhonetic?: string;
    sentenceDifficulty?: Word.sentenceDifficulty;
    sentenceAudio?: string | null;
    lesson?: Lesson;
    createdAt?: string;
    updatedAt?: string;
};
export namespace Word {
    export enum difficulty {
        EASY = 'easy',
        MEDIUM = 'medium',
        HARD = 'hard',
    }
    export enum sentenceDifficulty {
        EASY = 'Easy',
        MEDIUM = 'Medium',
        HARD = 'Hard',
    }
}

