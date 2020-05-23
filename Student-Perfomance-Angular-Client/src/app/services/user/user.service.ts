import { Injectable } from '@angular/core';
import { User } from '../../modules/common/models/interfaces/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = `${environment.apiUrl}/users`;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** PUT: update the hero on the server */
  // updateUser (user: User): Observable<any> {
  //   const url = `${this.apiUrl}${this.usersUrl}/${user.id}`;
  //   return this.http.put(url, user, this.httpOptions).pipe(
  //     catchError(this.handleError<any>('updateUser'))
  //   );
  // }

  // getUsers() : Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl + this.usersUrl).pipe(
  //     catchError(this.handleError<User[]>('getUsers', []))
  //   );
  // }

  // getUser(id: number): Observable<User> {
  //   const url = `${this.apiUrl}${this.usersUrl}/${id}`;
  //   return this.http.get<User>(url).pipe(
  //     catchError(this.handleError<User>(`getUser id=${id}`))
  //   );
  // }

  // addUser (user: User): Observable<User> {
  //   return this.http.post<User>(this.apiUrl + this.usersUrl + '/CreateUser', user, this.httpOptions).pipe(
  //     catchError(this.handleError<User>('addUser'))
  //   );
  // }

  // deleteUser (userId: number): Observable<User> {
  //   const url = `${this.apiUrl}${this.usersUrl}/${userId}`;
  
  //   return this.http.delete<User>(url, this.httpOptions).pipe(
  //     catchError(this.handleError<User>('deleteUser'))
  //   );
  // }

  // searchUsers(term: string): Observable<User[]> {
  //   if (!term.trim()) {
  //     return of([]);
  //   }
  //   const url = `${this.apiUrl}${this.usersUrl}/Search?search=${term}`;
  //   return this.http.get<User[]>(url).pipe(
  //     catchError(this.handleError<User[]>('searchUsers', []))
  //   );
  // }

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

}
