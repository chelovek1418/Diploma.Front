import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TeacherLesson } from 'src/app/modules/teacher/models/interfaces/TeacherLesson';
import { HandleService } from '../handle/handle.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly apiUrl: string = `${environment.apiUrl}/teachers`;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private handleService: HandleService) { }

  create (teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Teacher>('create'))
    );
  }

  getAll() : Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl).pipe(
      catchError(this.handleService.handleError<Teacher[]>('getAll', []))
    );
  }

  get(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleService.handleError<Teacher>('get'))
    );
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/Count').pipe(
      catchError(this.handleService.handleError<number>('getCount'))
    );
  }

  update(teacher: Teacher): Observable<any> {
    const url = `${this.apiUrl}/${teacher.id}`;
    return this.http.put(url, teacher, this.httpOptions).pipe(
      catchError(this.handleService.handleError<any>('update'))
    );
  }

  delete (teacherId: number): Observable<Teacher> {
    const url = `${this.apiUrl}/${teacherId}`;
  
    return this.http.delete<Teacher>(url, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Teacher>('delete'))
    );
  }
  
  search(term : string) : Observable<Teacher[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Teacher[]>(`${this.apiUrl}/Search?search=${term}`).pipe(
      catchError(this.handleService.handleError<Teacher[]>('search', []))
    );
  }

  getTeachersByLesson (lessonId: number): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}/GetByLesson?lessonId=${lessonId}`).pipe(
      catchError(this.handleService.handleError<Teacher[]>('getTeachersByLesson', []))
    );
  }

  confirmTeacher(id: number): Observable<any> {
    return this.http.post<number>(this.apiUrl + '/ConfirmTeacher', id, this.httpOptions).pipe(
      catchError(this.handleService.handleError<void>('confirmTeacher'))
    );
  }

  getUnconfirmed() : Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl + '/GetUnconfirmedTeachers').pipe(
      catchError(this.handleService.handleError<Teacher[]>('getUnconfirmed', []))
    );
  }
  
  dropLessonForTeacher(teacherLesson: TeacherLesson) : Observable<any> {
    return this.http.post<TeacherLesson>(this.apiUrl + '/DropLessonForTeacher', teacherLesson, this.httpOptions).pipe(
      catchError(this.handleService.handleError<void>('dropLessonForTeacher')));
  }

  addLessonForTeacher(teacherLesson: TeacherLesson) : Observable<any> {
    return this.http.post<TeacherLesson>(this.apiUrl + '/AddLessonForTeacher', teacherLesson, this.httpOptions).pipe(
      catchError(this.handleService.handleError<void>('addLessonForTeacher')));
  }
}
