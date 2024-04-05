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
  private localApiUrl = 'http://localhost:3001/scheduler';
  private media = 'http://localhost:3001/media';
  screenId = '123';
  private tenantId = '123456';

  constructor(private http: HttpClient) {}

  createScheduler(schedulerData: any): Observable<any> {
    console.log('Creating user:', schedulerData);
    return this.http.post<any>(this.localApiUrl, schedulerData);
  }
  

  getScheduleByScreenId(screenIdName:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?screenId=${screenIdName}`, );
  }
  getSchedulers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?tenantId=${this.tenantId}`, );
}

getVideos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.media}?tenantId=${this.tenantId}`, );
}

}