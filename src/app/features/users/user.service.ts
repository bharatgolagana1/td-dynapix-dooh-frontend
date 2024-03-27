import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3001/users';
  private tenantId = '123456';

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    console.log('Creating user:', userData);
  return this.http.post<any>(`${this.apiUrl}/create`, { ...userData, tenantId: this.tenantId });
  }
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?tenantId=${this.tenantId}`, );
  }
 
}
