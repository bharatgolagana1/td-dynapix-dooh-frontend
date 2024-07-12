import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Task } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = `${environment.baseApiUrl}/api/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  // Add more methods for additional module-related API operations if needed
}
