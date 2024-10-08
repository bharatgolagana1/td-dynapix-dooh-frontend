import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private baseApiurl = environment.baseApiUrl;
  // private baseApiurl = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  listScreens(page: number, pageSize: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<any>(`${this.baseApiurl}/screen`, {
      params,
    });
  }

  deleteScreen(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiurl}/screen/${id}`);
  }
  createScreen(screenData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiurl}/screen`, screenData);
  }

  updateScreen(id: string, formData: FormData) {
    const url = `${this.baseApiurl}/screen/${id}`;
    return this.http.put(url, formData);
  }

  getScreenDetails(screenId: string): Observable<any> {
    const url = `${this.baseApiurl}/screen/${screenId}`;
    return this.http.get<any>(url);
  }

  screensList(filters: any): Observable<any> {
    let params = new HttpParams();
    if (filters.addressOrPincode) {
      params = params.set('addressOrPincode', filters.addressOrPincode);
    }
    if (filters.screenType !== 'Both') {
      params = params.set('screenType', filters.screenType);
    }
    if (filters.orientation !== 'Both') {
      params = params.set('orientation', filters.orientation);
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
    return this.http.get<any>(`${this.baseApiurl}/screen`, { params });
  }

  updateScreenStatus(id: string, status: string): Observable<any> {
    const url = `${this.baseApiurl}/screen/${id}`;
    return this.http.put(url, { screenStatus: status });
  }

  listUnboundDevices(): Observable<any> {
    return this.http.get<any>(`${this.baseApiurl}/api/register`);
  }

  bindDevice(Guuid: string, screenId: string): Observable<any> {
    const url = `${this.baseApiurl}/api/register/bind-device`;
    return this.http.post<any>(url, { Guuid, screenId });
  }

  getSchedulers(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiurl}/settings/schedulers/getScheduler`
    );
  }

  getActiveCityNames(): Observable<any> {
    return this.http.get(`${this.baseApiurl}/settings/screen/getActiveCityNames`);
  }

  getActiveScreenCategories(): Observable<any> {
    return this.http.get(`${this.baseApiurl}/settings/screen/getActiveScreenCategories`);
  }

  getActiveScreenNetworks(): Observable<any> {
    return this.http.get(`${this.baseApiurl}/settings/screen/getActiveScreenNetworks`);
  }


  getActiveStates(): Observable<any> {
    return this.http.get(`${this.baseApiurl}/settings/state/getActiveStates`);
  }
}
