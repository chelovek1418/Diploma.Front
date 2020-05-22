import { Mark } from './mark';

export interface Lesson {
    id?: number;
    title: string;
    marks: Mark[];
}