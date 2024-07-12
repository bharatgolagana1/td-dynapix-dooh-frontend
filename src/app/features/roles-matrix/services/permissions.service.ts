import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Permission } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private baseUrl = `${environment.baseApiUrl}/api/permissions`;

  constructor(private http: HttpClient) {}

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.baseUrl);
  }

  updatePermissions(permissions: Permission[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/permissions`, permissions);
  }

  // Add more methods for additional module-related API operations if needed
}
