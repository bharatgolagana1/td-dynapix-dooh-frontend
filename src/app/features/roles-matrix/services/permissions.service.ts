import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private baseUrl = `http://localhost:3000/api/permissions`;

  constructor(private http: HttpClient) {}

  getPermissionsByRole(roleId: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/role/${roleId}`);
  }

  updatePermissions(data: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}`, data);
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}`);
  }
}
