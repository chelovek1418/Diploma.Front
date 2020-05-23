import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Rating } from 'src/app/modules/common/models/interfaces/rating';
import { Mark } from 'src/app/modules/common/models/interfaces/mark';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  
  private readonly apiUrl: string = `${environment.apiUrl}/marks`;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAverageMarkInGroupByLesson(lessonId: number, groupId : number) : Observable<number> {
    return this.http.get<number>(this.apiUrl + `/GetAverageByLessonInGroup?lessonId=${lessonId}&groupId=${groupId}`).pipe(
      catchError(this.handleError<number>('getAverageMarkInGroupByLesson'))
    );
  }

  getAverageForStudentByLesson(studentId : number, lessonId: number) : Observable<number> {
    return this.http.get<number>(this.apiUrl + `/GetAverageForStudentByLesson?studentId=${studentId}&lessonId=${lessonId}`).pipe(
      catchError(this.handleError<number>('getAverageForStudentByLesson'))
    );
  }

  setMark(mark : Mark) : Observable<Mark> {
    return this.http.post<Mark>(this.apiUrl, mark, this.httpOptions).pipe(
      catchError(this.handleError<Mark>('setMark'))
    );
  }

  editMark(mark : Mark) : Observable<Mark> {
    const url = `${this.apiUrl}/${mark.id}`;
    return this.http.put(url, mark, this.httpOptions).pipe(
      catchError(this.handleError<any>('editMark'))
    );
  }

  deleteMark(id : number) : Observable<Mark> {
    const url = `${this.apiUrl}/${id}`;  
    return this.http.delete<Mark>(url, this.httpOptions).pipe(
      catchError(this.handleError<Mark>('deleteMark'))
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
      catchError(this.handleError<Mark[]>('getTotalMarksForGroupByLesson'))
    );
  }

  getAverageMarkByStudentId(id: number): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/GetAverageByStudent?studentId='+ id).pipe(
      catchError(this.handleError<number>('getStudentRating'))
    );
  }

  getAverageForLesson(lessonId : number, startDate? : Date, endDate? : Date): Observable<number> {
    return this.http.get<number>(this.apiUrl + `/GetAverageByLesson?lessonId=${lessonId}`).pipe(
      catchError(this.handleError<number>('getAverageForLesson'))
    );
  }

  getStudentBestSubject(id: number): Observable<Rating> {
    return this.http.get<Rating>(this.apiUrl + '/GetMostRatedLesson?studentId='+ id).pipe(
      catchError(this.handleError<Rating>('getStudentBestSubject'))
    );
  }

  getStudentWorstSubject(id: number): Observable<Rating> {
    return this.http.get<Rating>(this.apiUrl + '/GetLessRatedLesson?studentId='+ id).pipe(
      catchError(this.handleError<Rating>('getStudentWorstSubject'))
    );
  }

  getStudentProductivity(studentId: number, term: number = 7): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/GetProductivityForTime?studentId=${studentId}&term=${term}`).pipe(
      catchError(this.handleError<number>('getStudentProductivity'))
    );
  }

  getStudentProductivityByLesson(studentId: number, lessonId: number, term: number = 7): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/GetProductivityForTimeByLesson?studentId=${studentId}&lessonId=${lessonId}&term=${term}`).pipe(
      catchError(this.handleError<number>('getStudentProductivityByLesson'))
    );
  }

  getStudentRating(id: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.apiUrl + '/GetRating?studentId='+ id).pipe(
      catchError(this.handleError<Rating[]>('getStudentRating'))
    );
  }

  // getStudent(id: number): Observable<Student> {
  //   const url = `${this.apiUrl}/getStudent?id=${id}`;
  //   return this.http.get<Student>(url).pipe(
  //     tap(_ => this.log(`fetched student id=${id}`)),
  //     catchError(this.handleError<Student>(`getStudent id=${id}`))
  //   );
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
