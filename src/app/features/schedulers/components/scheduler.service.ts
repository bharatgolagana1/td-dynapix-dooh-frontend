import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  createUser(value: any) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3001/scheduler';

  constructor(private http: HttpClient) {}

  createScheduler(schedulerData: any): Observable<any> {
    console.log('Creating user:', schedulerData);
    return this.http.post<any>(this.apiUrl, schedulerData);
  }
  
}
