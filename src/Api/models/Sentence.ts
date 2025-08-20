/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lesson } from './Lesson';
import type { Word } from './Word';
export type Sentence = {
    _id?: string;
    text?: string;
    phonetic?: string;
    audio?: string;
    baseWord?: Word;
    lesson?: Lesson;
};

