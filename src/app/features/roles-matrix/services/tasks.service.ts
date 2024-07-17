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

  createTasks(data: {
    moduleId: string;
    name: string;
    value: string;
  }): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}`, data);
  }
}
