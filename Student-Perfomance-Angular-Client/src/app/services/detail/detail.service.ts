import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Detail } from 'src/app/modules/common/models/interfaces/details';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HandleService } from '../handle/handle.service';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private readonly apiUrl: string = `${environment.apiUrl}/details`;

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private handleService: HandleService) { }

  create(detail: Detail): Observable<Detail> {
    return this.http.post<Detail>(this.apiUrl, detail, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Detail>('create'))
    );
  }

  update(detail: Detail): Observable<any> {
    const url = `${this.apiUrl}/${detail.id}`;
    return this.http.put<Detail>(url, detail, this.httpOptions).pipe(
      catchError(this.handleService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Detail> {
    const url = `${this.apiUrl}/${id}`;
  
    return this.http.delete<Detail>(url, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Detail>('delete'))
    );
  }

  getForTeacher(teacherId: number, semestr: number): Observable<Detail[]> {
    return this.http.get<Detail[]>(`${this.apiUrl}/GetScheduleForTeacher?teacherId=${teacherId}&semestr=${semestr}`).pipe(
      catchError(this.handleService.handleError<Detail[]>('getForTeacher', []))
    );
  }

  getForGroup(groupId: number, semestr: number): Observable<Detail[]> {
    return this.http.get<Detail[]>(`${this.apiUrl}/GetScheduleForGroup?groupId=${groupId}&semestr=${semestr}`).pipe(
      catchError(this.handleService.handleError<Detail[]>('getForGroup', []))
    );
  }

  getForTeacherByLessonAndGroup(teacherId: number, lessonId: number, groupId: number, semestr: number): Observable<Detail[]> {
    return this.http.get<Detail[]>(`${this.apiUrl}/GetScheduleForTeacherByLessonAndGroup?teacherId=${teacherId}&lessonId=${lessonId}&groupId=${groupId}&semestr=${semestr}`).pipe(
      catchError(this.handleService.handleError<Detail[]>('getForTeacherByLessonAndGroup', []))
    );
  }

}
