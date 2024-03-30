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

  private apiUrl = 'http://ec2-13-211-129-217.ap-southeast-2.compute.amazonaws.com:3001/scheduler';
  screenId = '123';

  constructor(private http: HttpClient) {}

  createScheduler(schedulerData: any): Observable<any> {
    console.log('Creating user:', schedulerData);
    return this.http.post<any>(this.apiUrl, schedulerData);
  }
  

  getScheduleByScreenId(screenIdName:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?screenId=${screenIdName}`, );
  }
}
