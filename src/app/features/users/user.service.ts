import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;

  private userCreatedSubject: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    console.log('Creating user:', userData);
    return this.http
      .post<any>(`${this.baseApiUrl}/users/create`, { ...userData })
      .pipe(tap(() => this.userCreatedSubject.next()));
  }

  getUsers(
    pageIndex: number,
    pageSize: number,
    search: string,
    sortBy: string,
    sortOrder: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('search', search)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http.get<any[]>(`${this.baseApiUrl}/users`, { params });
  }

  userCreated(): Observable<void> {
    return this.userCreatedSubject.asObservable();
  }

  deleteUser(user: any): Observable<any> {
    console.log('Deleting user:', user);
    return this.http.delete<any[]>(`${this.baseApiUrl}/users/${user._id}`);
  }

  updateUser(user: any): Observable<any> {
    console.log('Updating user:', user);
    return this.http.put<any[]>(`${this.baseApiUrl}/users/${user._id}`, user);
  }

  getIdentificationTypes(): Observable<any> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/user/getIdentificationtypes`
    );
  }

  getRoles(): Observable<any> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/user/getRoles`);
  }

  getProfiles(): Observable<any> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/user/getProfiles`);
  }
}
