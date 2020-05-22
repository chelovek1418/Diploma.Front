import { User } from './user';

export interface Teacher {
    id?: number;
    position: string;
    user: User;
  }