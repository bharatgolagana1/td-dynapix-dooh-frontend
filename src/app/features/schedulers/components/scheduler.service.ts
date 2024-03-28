import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  private apiUrl = 'http://localhost:3001/scheduler';

  constructor(private http: HttpClient) {}

  createScheduler(schedulerData: any) {
    return this.http.post(this.apiUrl, schedulerData);
  }
}
