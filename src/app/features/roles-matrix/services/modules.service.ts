import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Module } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  private baseUrl = `${environment.baseApiUrl}/api/modules`;

  constructor(private http: HttpClient) {}

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.baseUrl);
  }

  // Add more methods for additional module-related API operations if needed
}
