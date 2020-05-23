import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { GroupLesson } from 'src/app/modules/common/models/interfaces/groupLesson';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private readonly apiUrl: string = `${environment.apiUrl}/groups`;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getGroupWithMarksByLesson(groupId : number, lessonId : number, date? : Date) : Observable<Group> {
    const url = `${this.apiUrl}/GetWithMarksByLesson?groupId=${groupId}&lessonId=${lessonId}&date=${date?.toISOString()}`;
    return this.http.get<Group>(url).pipe(
      catchError(this.handleError<Group>(`getGroupWithMarksByLesson id=${groupId}`))
    );
  }

  addLessonForGroup(groupLesson : GroupLesson) : Observable<any> {
    return this.http.post<GroupLesson>(this.apiUrl + '/AddLesson', groupLesson, this.httpOptions).pipe(
      catchError(this.handleError<void>('addLessonForGroup')));
  }

  dropLessonFromGroup(groupLesson : GroupLesson) : Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: groupLesson,
    };
    return this.http.delete<GroupLesson>(this.apiUrl + '/DropLesson', options).pipe(
      catchError(this.handleError<void>('addLessonForGroup')));
  }

  searchGroups(term : string) : Observable<Group[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Group[]>(`${this.apiUrl}/SearchGroups?search=${term}`).pipe(
      catchError(this.handleError<Group[]>('searchGroups', []))
    );
  }

  deleteGroup(id: number): Observable<Group> {
    const url = `${this.apiUrl}/${id}`;
  
    return this.http.delete<Group>(url, this.httpOptions).pipe(
      catchError(this.handleError<Group>('deleteGroup'))
    );
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, group, this.httpOptions).pipe(
      catchError(this.handleError<Group>('createGroup'))
    );
  }

  updateGroup(group : Group): Observable<any> {
    const url = `${this.apiUrl}/${group.id}`;
    return this.http.put(url, group, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateGroup'))
    );
  }

  getGroupsByLesson(id: number) : Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl + '/GetByLesson?lessonId=' + id).pipe(
      catchError(this.handleError<Group[]>('getGroupsByLesson', []))
    );
  }

  isUniqueTitle(title: string): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + '/CheckTitle?title=' + title).pipe(
      catchError(this.handleError<boolean>(`isUniqueTitle title=${title}`))
    );
  }

  getGroup(id: number): Observable<Group> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Group>(url).pipe(
      catchError(this.handleError<Group>(`getGroup id=${id}`))
    );
  }
  
  getGroups() : Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl).pipe(
      catchError(this.handleError<Group[]>('getGroups', []))
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
