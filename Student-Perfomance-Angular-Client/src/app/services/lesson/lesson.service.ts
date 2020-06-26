import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HandleService } from '../handle/handle.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private readonly apiUrl: string = `${environment.apiUrl}/lessons`;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private handleService: HandleService) { }

  searchLessons(term : string) : Observable<Lesson[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Lesson[]>(`${this.apiUrl}/Searchlessons?search=${term}`).pipe(
      catchError(this.handleService.handleError<Lesson[]>('searchLessons', []))
    );
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/Count').pipe(
      catchError(this.handleService.handleError<number>('getCount'))
    );
  }

  getLesson(id: number): Observable<Lesson> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Lesson>(url).pipe(
      catchError(this.handleService.handleError<Lesson>(`getLesson id=${id}`))
    );
  }
  
  getLessons() : Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiUrl).pipe(
      catchError(this.handleService.handleError<Lesson[]>('getLessons', []))
    );
  }

  getLessonsByGroup(id: number) : Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiUrl + '/GetByGroup?groupId=' + id).pipe(
      catchError(this.handleService.handleError<Lesson[]>('getLessonsByGroup', []))
    );
  }

  getLessonsByTeacher(id: number) : Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiUrl + '/GetByTeacher?teacherId=' + id).pipe(
      catchError(this.handleService.handleError<Lesson[]>('getLessonsByTeacher', []))
    );
  }

  createLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(this.apiUrl, lesson, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Lesson>('createLesson'))
    );
  }

  getLessonsWithMarksForTimeByStudentId(studentId: number, startDate: Date, endDate: Date): Observable<Lesson[]> {    
    return this.http.get<Lesson[]>(`${this.apiUrl}/GetLessonsWithMarksForTimeByStudentId?studentId=${studentId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`).pipe(
      catchError(this.handleService.handleError<Lesson[]>('getLessonsWithMarksForTimeByStudentId', []))
    );
  }

  isUniqueTitle(title: string): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + '/CheckTitle?title=' + title).pipe(
      catchError(this.handleService.handleError<boolean>(`isUniqueTitle title=${title}`))
    );
  }

  updateLesson(lesson : Lesson): Observable<any> {
    const url = `${this.apiUrl}/${lesson.id}`;
    return this.http.put(url, lesson, this.httpOptions).pipe(
      catchError(this.handleService.handleError<any>('updateLesson'))
    );
  }

  deleteLesson(id: number): Observable<Lesson> {
    const url = `${this.apiUrl}/${id}`;  
    return this.http.delete<Lesson>(url, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Lesson>('deleteLesson'))
    );
  }
}
