import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private baseUrl = environment.baseApiUrl;
  private permissions: any[] = [];

  constructor(private http: HttpClient) {
    this.loadPermissionsFromStorage();
  }

  getPermissionsByRole(roleId: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(
      `${this.baseUrl}/api/permissions/role/${roleId}`
    );
  }

  updatePermissions(data: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/permissions`, data);
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/api/permissions`);
  }

  setPermissions(permissions: any[]): void {
    this.permissions = permissions;
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  hasPermission(taskValue: string): boolean {
    const permission = this.permissions.find(p => p.taskValue === taskValue);
    return permission ? permission.enable : false;
  }

  hasAnyPermission(taskValues: string[]): boolean {
    return taskValues.some((taskValue) => this.hasPermission(taskValue));
  }

  private loadPermissionsFromStorage(): void {
    const savedPermissions = localStorage.getItem('permissions');
    if (savedPermissions) {
      this.permissions = JSON.parse(savedPermissions);
    }
  }
}
