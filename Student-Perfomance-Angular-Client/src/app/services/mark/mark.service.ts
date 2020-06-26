import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Rating } from 'src/app/modules/common/models/interfaces/rating';
import { Mark } from 'src/app/modules/common/models/interfaces/mark';
import { environment } from 'src/environments/environment';
import { HandleService } from '../handle/handle.service';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  
  private readonly apiUrl: string = `${environment.apiUrl}/marks`;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private handleService: HandleService) { }

  getAverageMarkInGroupByLesson(lessonId: number, groupId : number) : Observable<number> {
    return this.http.get<number>(this.apiUrl + `/GetAverageByLessonInGroup?lessonId=${lessonId}&groupId=${groupId}`).pipe(
      catchError(this.handleService.handleError<number>('getAverageMarkInGroupByLesson'))
    );
  }

  getAverageForStudentByLesson(studentId : number, lessonId: number) : Observable<number> {
    return this.http.get<number>(this.apiUrl + `/GetAverageForStudentByLesson?studentId=${studentId}&lessonId=${lessonId}`).pipe(
      catchError(this.handleService.handleError<number>('getAverageForStudentByLesson'))
    );
  }

  getMissingsForStudent(studentId : number) : Observable<number> {
    return this.http.get<number>(this.apiUrl + `/GetMissingsByStudent?studentId=${studentId}`).pipe(
      catchError(this.handleService.handleError<number>('getMissingsForStudent'))
    );
  }

  getMissingsForStudentByLesson(studentId : number, lessonId: number) : Observable<number> {
    return this.http.get<number>(this.apiUrl + `/GetMissingsByStudentByLesson?studentId=${studentId}&lessonId=${lessonId}`).pipe(
      catchError(this.handleService.handleError<number>('GetMissingsByStudentByLesson'))
    );
  }

  setMark(mark : Mark) : Observable<Mark> {
    return this.http.post<Mark>(this.apiUrl, mark, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Mark>('setMark'))
    );
  }

  editMark(mark : Mark) : Observable<Mark> {
    const url = `${this.apiUrl}/${mark.id}`;
    return this.http.put(url, mark, this.httpOptions).pipe(
      catchError(this.handleService.handleError<any>('editMark'))
    );
  }

  deleteMark(id : number) : Observable<Mark> {
    const url = `${this.apiUrl}/${id}`;  
    return this.http.delete<Mark>(url, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Mark>('deleteMark'))
    );
  }

  getTotalMarksForGroupByLesson(groupId: number, lessonId : number, startDate? : Date, endDate? : Date) : Observable<Mark[]> {
    const params = new HttpParams();
    if (startDate){
      params.set("startDate", startDate.toISOString())
    }
    if (endDate){
      params.set("endDate", endDate.toISOString())
    }

    return this.http.get<Mark[]>(this.apiUrl + `/GetTotalMarksForGroupByLesson?groupId=${groupId}&lessonId=${lessonId}`, { params }).pipe(
      catchError(this.handleService.handleError<Mark[]>('getTotalMarksForGroupByLesson'))
    );
  }

  getTotalMarksFoStudentByLesson(studentId: number, lessonId : number, startDate? : Date, endDate? : Date) : Observable<Mark[]> {
    const params = new HttpParams();
    if (startDate){
      params.set("startDate", startDate.toISOString())
    }
    if (endDate){
      params.set("endDate", endDate.toISOString())
    }

    return this.http.get<Mark[]>(this.apiUrl + `/GetMarksForTimeByLesson?studentId=${studentId}&lessonId=${lessonId}`, { params }).pipe(
      catchError(this.handleService.handleError<Mark[]>('getTotalMarksFoStudentByLesson'))
    );
  }

  getAverageMarkByStudentId(id: number): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/GetAverageByStudent?studentId='+ id).pipe(
      catchError(this.handleService.handleError<number>('getStudentRating'))
    );
  }

  getAverageForLesson(lessonId : number, startDate? : Date, endDate? : Date): Observable<number> {
    return this.http.get<number>(this.apiUrl + `/GetAverageByLesson?lessonId=${lessonId}`).pipe(
      catchError(this.handleService.handleError<number>('getAverageForLesson'))
    );
  }

  getStudentBestSubject(id: number): Observable<Rating> {
    return this.http.get<Rating>(this.apiUrl + '/GetMostRatedLesson?studentId='+ id).pipe(
      catchError(this.handleService.handleError<Rating>('getStudentBestSubject'))
    );
  }

  getStudentWorstSubject(id: number): Observable<Rating> {
    return this.http.get<Rating>(this.apiUrl + '/GetLessRatedLesson?studentId='+ id).pipe(
      catchError(this.handleService.handleError<Rating>('getStudentWorstSubject'))
    );
  }

  getStudentProductivity(studentId: number, term: number = 7): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/GetProductivityForTime?studentId=${studentId}&term=${term}`).pipe(
      catchError(this.handleService.handleError<number>('getStudentProductivity'))
    );
  }

  getStudentProductivityByLesson(studentId: number, lessonId: number, term: number = 7): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/GetProductivityForTimeByLesson?studentId=${studentId}&lessonId=${lessonId}&term=${term}`).pipe(
      catchError(this.handleService.handleError<number>('getStudentProductivityByLesson'))
    );
  }

  getStudentRating(id: number , startDate? : Date, endDate? : Date): Observable<Rating[]> {
    const params = new HttpParams();
    if (startDate){
      params.set("startDate", startDate.toISOString())
    }
    if (endDate){
      params.set("endDate", endDate.toISOString())
    }

    return this.http.get<Rating[]>(this.apiUrl + '/GetRating?studentId='+ id, { params }).pipe(
      catchError(this.handleService.handleError<Rating[]>('getStudentRating'))
    );
  }

  // getStudent(id: number): Observable<Student> {
  //   const url = `${this.apiUrl}/getStudent?id=${id}`;
  //   return this.http.get<Student>(url).pipe(
  //     tap(_ => this.log(`fetched student id=${id}`)),
  //     catchError(this.handleError<Student>(`getStudent id=${id}`))
  //   );
  // }
  
}
