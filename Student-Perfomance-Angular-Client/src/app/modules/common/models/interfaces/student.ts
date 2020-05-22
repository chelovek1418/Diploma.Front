import { User } from './user';
import { Mark } from './mark';
import { Group } from './group';

export interface Student {
    id?: number;
    group?: Group;
    user: User;
    marks? : Mark[];
  }