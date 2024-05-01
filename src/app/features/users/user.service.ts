import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://ec2-13-211-129-217.ap-southeast-2.compute.amazonaws.com:3001/users';
  private localAPIUrl =  'http://localhost:3001/users';
  private tenantId = '123456';

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    console.log('Creating user:', userData);
    return this.http.post<any>(`${this.apiUrl}/create`, { ...userData, tenantId: this.tenantId });
  }

  getUsers(pageIndex: number, pageSize: number, search: string): Observable<any> {
    const params = new HttpParams()
      .set('tenantId', this.tenantId)
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('search', search);
    return this.http.get<any>(this.localAPIUrl, { params });
  }
}
