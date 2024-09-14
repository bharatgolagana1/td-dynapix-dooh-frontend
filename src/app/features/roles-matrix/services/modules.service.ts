import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Module } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  private baseUrl = `http://localhost:3000/api/modules`;

  constructor(private http: HttpClient) {}

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.baseUrl);
  }
  getModuleById(id: string): Observable<Module> {
    return this.http.get<Module>(`${this.baseUrl}/${id}`);
  }
  createModule(data: any): Observable<Module> {
    return this.http.post<Module>(`${this.baseUrl}`, data);
  }
}
