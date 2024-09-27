import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private baseUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/api/roles`);
  }
  getRoleById(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/api/roles/${id}`);
  }
  createRoles(data: any): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/api/roles`, data);
  }
}
