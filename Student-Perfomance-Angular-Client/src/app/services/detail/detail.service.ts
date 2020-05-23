import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Detail } from 'src/app/modules/common/models/interfaces/details';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private readonly apiUrl: string = `${environment.apiUrl}/details`;

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getForTeacher(teacherId: number, semestr: number): Observable<Detail[]> {
    return this.http.get<Detail[]>(`${this.apiUrl}/GetScheduleForTeacher?teacherId=${teacherId}&semestr=${semestr}`).pipe(
      catchError(this.handleError<Detail[]>('getForTeacher', []))
    );
  }

  getForGroup(groupId: number, semestr: number): Observable<Detail[]> {
    return this.http.get<Detail[]>(`${this.apiUrl}/GetScheduleForGroup?groupId=${groupId}&semestr=${semestr}`).pipe(
      catchError(this.handleError<Detail[]>('getForGroup', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
