import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/capability.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseApiUrl = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/api/tasks`);
  }
  getTasksByModuleId(moduleId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/api/tasks/module/${moduleId}`);
  }
  createTasks(data: any): Observable<Task> {
    return this.http.post<Task>(`${this.baseApiUrl}/api/tasks`, data);
  }
}
