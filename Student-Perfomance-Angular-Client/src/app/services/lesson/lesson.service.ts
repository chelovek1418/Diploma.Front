import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private readonly apiUrl: string = 'https://localhost:44322/api/lessons';
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  searchLessons(term : string) : Observable<Lesson[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Lesson[]>(`${this.apiUrl}/Searchlessons?search=${term}`).pipe(
      catchError(this.handleError<Lesson[]>('searchLessons', []))
    );
  }

  getLesson(id: number): Observable<Lesson> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Lesson>(url).pipe(
      catchError(this.handleError<Lesson>(`getLesson id=${id}`))
    );
  }
  
  getLessons() : Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiUrl).pipe(
      catchError(this.handleError<Lesson[]>('getLessons', []))
    );
  }

  getLessonsByGroup(id: number) : Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiUrl + '/GetByGroup?groupId=' + id).pipe(
      catchError(this.handleError<Lesson[]>('getLessonsByGroup', []))
    );
  }

  createLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(this.apiUrl, lesson, this.httpOptions).pipe(
      catchError(this.handleError<Lesson>('createLesson'))
    );
  }

  getLessonsWithMarksForTimeByStudentId(studentId: number, startDate: Date, endDate: Date): Observable<Lesson[]> {    
    return this.http.get<Lesson[]>(`${this.apiUrl}/GetLessonsWithMarksForTimeByStudentId?studentId=${studentId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`).pipe(
      catchError(this.handleError<Lesson[]>('getLessonsWithMarksForTimeByStudentId', []))
    );
  }

  isUniqueTitle(title: string): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + '/CheckTitle?title=' + title).pipe(
      catchError(this.handleError<boolean>(`isUniqueTitle title=${title}`))
    );
  }

  updateLesson(lesson : Lesson): Observable<any> {
    const url = `${this.apiUrl}/${lesson.id}`;
    return this.http.put(url, lesson, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateLesson'))
    );
  }

  deleteLesson(id: number): Observable<Lesson> {
    const url = `${this.apiUrl}/${id}`;  
    return this.http.delete<Lesson>(url, this.httpOptions).pipe(
      catchError(this.handleError<Lesson>('deleteLesson'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
