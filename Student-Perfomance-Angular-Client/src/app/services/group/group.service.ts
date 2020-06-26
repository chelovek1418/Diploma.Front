import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { GroupLesson } from 'src/app/modules/common/models/interfaces/groupLesson';
import { environment } from 'src/environments/environment';
import { HandleService } from '../handle/handle.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private readonly apiUrl: string = `${environment.apiUrl}/groups`;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private handleService: HandleService) { }

  getGroupWithMarksByLesson(groupId : number, lessonId : number, date? : Date) : Observable<Group> {
    const url = `${this.apiUrl}/GetWithMarksByLesson?groupId=${groupId}&lessonId=${lessonId}&date=${date?.toISOString()}`;
    return this.http.get<Group>(url).pipe(
      catchError(this.handleService.handleError<Group>(`getGroupWithMarksByLesson id=${groupId}`))
    );
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/Count').pipe(
      catchError(this.handleService.handleError<number>('getCount'))
    );
  }

  addLessonForGroup(groupLesson : GroupLesson) : Observable<any> {
    return this.http.post<GroupLesson>(this.apiUrl + '/AddLesson', groupLesson, this.httpOptions).pipe(
      catchError(this.handleService.handleError<void>('addLessonForGroup')));
  }

  dropLessonFromGroup(groupLesson : GroupLesson) : Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: groupLesson,
    };
    return this.http.delete<GroupLesson>(this.apiUrl + '/DropLesson', options).pipe(
      catchError(this.handleService.handleError<void>('addLessonForGroup')));
  }

  searchGroups(term : string) : Observable<Group[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Group[]>(`${this.apiUrl}/SearchGroups?search=${term}`).pipe(
      catchError(this.handleService.handleError<Group[]>('searchGroups', []))
    );
  }

  deleteGroup(id: number): Observable<Group> {
    const url = `${this.apiUrl}/${id}`;
  
    return this.http.delete<Group>(url, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Group>('deleteGroup'))
    );
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, group, this.httpOptions).pipe(
      catchError(this.handleService.handleError<Group>('createGroup'))
    );
  }

  updateGroup(group : Group): Observable<any> {
    const url = `${this.apiUrl}/${group.id}`;
    return this.http.put(url, group, this.httpOptions).pipe(
      catchError(this.handleService.handleError<any>('updateGroup'))
    );
  }

  getGroupsByLesson(id: number) : Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl + '/GetByLesson?lessonId=' + id).pipe(
      catchError(this.handleService.handleError<Group[]>('getGroupsByLesson', []))
    );
  }

  isUniqueTitle(title: string): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + '/CheckTitle?title=' + title).pipe(
      catchError(this.handleService.handleError<boolean>(`isUniqueTitle title=${title}`))
    );
  }

  getGroup(id: number): Observable<Group> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Group>(url).pipe(
      catchError(this.handleService.handleError<Group>(`getGroup id=${id}`))
    );
  }
  
  getGroups() : Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl).pipe(
      catchError(this.handleService.handleError<Group[]>('getGroups', []))
    );
  }

}
