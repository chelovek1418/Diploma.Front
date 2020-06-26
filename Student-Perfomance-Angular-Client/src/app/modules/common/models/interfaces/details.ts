import { Group } from './group';
import { Lesson } from './lesson';
import { Teacher } from './teacher';

export interface Detail {
    id?: number;
    dayOfWeek: number;
    pair: number;
    group?: Group;
    subject?: Lesson;
    teacher?: Teacher;
    isNumerator?: boolean;
    semestr: number;
    groupSubjectId?: number;
}