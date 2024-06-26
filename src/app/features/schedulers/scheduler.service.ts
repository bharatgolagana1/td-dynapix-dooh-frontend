import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
  private baseApiUrl = environment.baseApiUrl;
  private mediaUrl = 'http://localhost:3001/media'
  private tenantId =  environment.tenantId;

  constructor(private http: HttpClient) {}

  createScheduler(schedulerData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/scheduler`, schedulerData);
  }

  getSchedulers(
    pageIndex: number,
    pageSize: number,
    search: string = ''
  ): Observable<any[]> {
    const url = `${this.baseApiUrl}/scheduler/?pageIndex=${pageIndex}&pageSize=${pageSize}&tenantId=${this.tenantId}&search=${search}`;
    return this.http.get<any[]>(url);
  }

  getVideos(): Observable<any[]> {
    const url = `${this.mediaUrl}?tenantId=${this.tenantId}`;
    console.log(`Fetching videos from URL: ${url}`);
    return this.http.get<any[]>(url);
}

  getScreensForTenant(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/screen/api/screens`);
  }

  deleteScheduler(scheduler: any): Observable<any> {
    console.log('Deleting user:', scheduler);
    return this.http.delete<any[]>(
      `${this.baseApiUrl}/scheduler/${scheduler._id}`
    );
  }

  updateScheduler(schedulerId: string, schedulerData: any): Observable<any> {
    return this.http.put(
      `${this.baseApiUrl}/scheduler/${schedulerId}`,
      schedulerData
    );
  }

  getSchedulerById(schedulerId: string): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/scheduler/${schedulerId}`);
  }

  getScreens(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/screens`);
  }
  
  getAvailableScreens(startDate: string, endDate: string): Observable<any> {
    const url = `${this.baseApiUrl}/scheduler/available-screens?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any>(url);
  }
}
