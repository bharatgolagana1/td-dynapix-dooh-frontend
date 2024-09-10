import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
;
  private baseApiUrl = environment.baseApiUrl;
  private mediaUrl = environment.baseApiUrl;
  private tenantId =  environment.tenantId;

  constructor(private http: HttpClient) {}

  createScheduler(schedulerData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/scheduler`, schedulerData);
  }

  getScreen(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/screens/${id}`);
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
    const url = `${this.mediaUrl}/media?tenantId=${this.tenantId}`;
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

  
  getAvailableScreens(startDate: string, endDate: string): Observable<any> {
    const url = `${this.baseApiUrl}/scheduler/available-screens?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any>(url);
  }

  // screensList method added from ScreenService
  screensList(filters: any): Observable<any> {
    let params = new HttpParams();
    if (filters.addressOrPincode) {
      params = params.set('addressOrPincode', filters.addressOrPincode);
    }
    if (filters.screenType !== 'Both') {
      params = params.set('screenType', filters.screenType);
    }
    if (filters.size !== 'All') {
      params = params.set('size', filters.size);
    }
    if (filters.status !== 'Both') {
      params = params.set('status', filters.status);
    }
    if (filters.date !== 'All Time') {
      params = params.set('date', filters.date);
      if (filters.date === 'Date Range') {
        if (filters.fromDate) {
          params = params.set('fromDate', filters.fromDate);
        }
        if (filters.toDate) {
          params = params.set('toDate', filters.toDate);
        }
      }
    }
    return this.http.get<any>(`${this.baseApiUrl}/screen`, { params });
  }


  getScreenDetailsByName(screenName: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/campaign/screen/details?screenName=${screenName}`
    );
  }


  getPlaylistByScreenIdAndDate(screenId: string, date: string, organizationId: any): Observable<any> {
    const params = new HttpParams()
      .set('screenId', screenId)
      .set('date', date)
      .set('organizationId', organizationId);

    const url = `${this.baseApiUrl}/playlist`;

    return this.http.get<any>(url, { params });
  }
}


  
