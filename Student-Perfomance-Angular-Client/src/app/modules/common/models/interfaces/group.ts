import { Student } from './student';
import { Teacher } from './teacher';

export interface Group {
    id?: number;
    title: string;
    students: Student[];
    year: number;
    faculty: string;
    speciality: string;
    specialization?: string;
    headmen?: Student;
    curator?: Teacher;
}