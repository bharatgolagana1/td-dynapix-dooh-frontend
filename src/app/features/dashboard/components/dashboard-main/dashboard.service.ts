import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseApiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTotalAndInactiveScreens(): Observable<{ totalScreens: number, inactiveScreens: number }> {
    return this.http.get<{ totalScreens: number, inactiveScreens: number }>(`${this.baseApiUrl}/screen/screens/counts`);
  }

  getBoundDevicesCount(): Observable<{ message: string, count: number }> {
    return this.http.get<{ message: string, count: number }>(`${this.baseApiUrl}/api/register/count-bound-devices`);
  }

}
