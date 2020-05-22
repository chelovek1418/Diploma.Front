import { Student } from './student';
import { Mark } from './mark';

export interface StudentMarks {
    student : Student;
    marks : Mark[];
  }