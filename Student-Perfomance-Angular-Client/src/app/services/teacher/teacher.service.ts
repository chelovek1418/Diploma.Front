import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly apiUrl: string = 'https://localhost:44322/api/teachers';
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  create (teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher, this.httpOptions).pipe(
      catchError(this.handleError<Teacher>('create'))
    );
  }

  getAll() : Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl).pipe(
      catchError(this.handleError<Teacher[]>('getAll', []))
    );
  }

  get(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Teacher>('get'))
    );
  }

  delete (teacherId: number): Observable<Teacher> {
    const url = `${this.apiUrl}/${teacherId}`;
  
    return this.http.delete<Teacher>(url, this.httpOptions).pipe(
      catchError(this.handleError<Teacher>('delete'))
    );
  }

  confirmTeacher(id: number): Observable<any> {
    return this.http.post<number>(this.apiUrl + '/ConfirmTeacher', id, this.httpOptions).pipe(
      catchError(this.handleError<void>('confirmTeacher'))
    );
  }

  getUnconfirmed() : Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl + '/GetUnconfirmedTeachers').pipe(
      catchError(this.handleError<Teacher[]>('getUnconfirmed', []))
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
