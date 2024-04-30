import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private apiUrl = 'http://ec2-13-211-129-217.ap-southeast-2.compute.amazonaws.com:3001/scheduler';
  private localApiUrl = 'http://localhost:3001/scheduler';
  private media = 'http://localhost:3001/media';
  private screens = 'http://localhost:3001/screen';
  private tenantId = '123456';

  constructor(private http: HttpClient) { }

  createScheduler(schedulerData: any): Observable<any> {
    return this.http.post<any>(this.localApiUrl, schedulerData);
  }

  getScheduleByScreenId(screenIdName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?screenId=${screenIdName}`);
  }

  getSchedulers(pageIndex: number, pageSize: number): Observable<any[]> {
    const url = `${this.localApiUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}&tenantId=${this.tenantId}`;
    return this.http.get<any[]>(url);
  }

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.media}?tenantId=${this.tenantId}`);
  }

  getScreensForTenant(): Observable<any> {
    return this.http.get<any>(`${this.screens}/api/screens`);
  }
}
