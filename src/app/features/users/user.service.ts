import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://ec2-13-211-129-217.ap-southeast-2.compute.amazonaws.com:3001/users';
  private localAPIUrl =  'http://localhost:3001/users';
  private tenantId = '123456';

  // Subject to notify when a new user is created
  private userCreatedSubject: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    console.log('Creating user:', userData);
    return this.http.post<any>(`${this.localAPIUrl}/create`, { ...userData, tenantId: this.tenantId })
    .pipe(
      // Once the user is created, notify subscribers that a new user was created
      tap(() => this.userCreatedSubject.next())
    );
}
  

getUsers(pageIndex: number, pageSize: number, search: string): Observable<any> {
  const params = new HttpParams()
    .set('tenantId', this.tenantId)
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    .set('search', search);

  return this.http.get<any[]>(`${this.localAPIUrl}`, { params });
}




  // Observable for components to subscribe to when a new user is created
  userCreated(): Observable<void> {
    return this.userCreatedSubject.asObservable();
  }

  deleteUser(user: any): Observable<any> {
    console.log('Deleting user:', user);
    return this.http.delete<any[]>(`${this.localAPIUrl}/${user._id}`); 
  }
  
  updateUser(user: any): Observable<any> {
    console.log('Updating user:', user);
    return this.http.put<any[]>(`${this.localAPIUrl}/${user._id}`, user);
  }
  
  
}