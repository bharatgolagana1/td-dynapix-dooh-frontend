import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

   getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/api/register/dashboard-stats`);
  }

}
