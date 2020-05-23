import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly apiUrl: string = `${environment.apiUrl}/students`;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBestStudents(date? : Date) : Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl + `/GetBestStudents?startDate=${date?.toISOString()}&endDate=${date?.toISOString()}`,).pipe(
      catchError(this.handleError<Student[]>('getBestStudents', []))
    );
  }

  getStudents() : Observable<Student[]> {
    // if (take < 0 || skip < 0)
    //   return of([]);
    return this.http.get<Student[]>(this.apiUrl).pipe(
      catchError(this.handleError<Student[]>('getStudents', []))
    );
  }

  getBestStudent(): Observable<Student> {
    return this.http.get<Student>(this.apiUrl + '/GetBestStudent').pipe(
      catchError(this.handleError<Student>('getBestStudent'))
    );
  }

  getTopRatedStudentInGroupByLesson(lessonId: number, groupId: number): Observable<Student> {
    const url = `${this.apiUrl}/GetBestStudentForLessonInGroup?lessonId=${lessonId}&groupId=${groupId}`;
    return this.http.get<Student>(url).pipe(
      catchError(this.handleError<Student>(`getTopRatedStudentInGroupByLesson lessonId=${lessonId} & groupId=${groupId}`))
    );
  }

  getWorstRatedStudentInGroupByLesson(lessonId: number, groupId: number): Observable<Student> {
    const url = `${this.apiUrl}/GetWorstStudentForLessonInGroup?lessonId=${lessonId}&groupId=${groupId}`;
    return this.http.get<Student>(url).pipe(
      catchError(this.handleError<Student>(`getWorstRatedStudentInGroupByLesson lessonId=${lessonId} & groupId=${groupId}`))
    );
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  addStudent (user: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  updateStudent (student: Student): Observable<any> {
    const url = `${this.apiUrl}/${student.id}`;
    return this.http.put(url, student, this.httpOptions).pipe(
      catchError(this.handleError<any>('student'))
    );
  }

  delete (id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;  
    return this.http.delete<Student>(url, this.httpOptions).pipe(
      catchError(this.handleError<Student>('delete'))
    );
  }

  searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.apiUrl}/Search?search=${term}`;
    return this.http.get<Student[]>(url).pipe(
      catchError(this.handleError<Student[]>('searchStudents', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
