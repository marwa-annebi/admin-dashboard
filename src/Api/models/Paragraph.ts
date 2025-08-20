/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lesson } from './Lesson';
export type Paragraph = {
    _id?: string;
    textIncomplete?: string;
    answersOrdered?: Array<string>;
    blankPositions?: Array<{
        start?: number;
        end?: number;
    }>;
    lesson?: Lesson;
    image?: string;
};

