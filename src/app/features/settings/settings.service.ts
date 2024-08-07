import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  createIdentificationType(
    status: string,
    identificationType: string
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/settings/user/createIdentificationtype`,
      { status, identificationType }
    );
  }

  deleteIdentificationType(identificationType: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/settings/user/deleteIdentificationtype`,
      { body: { identificationType } }
    );
  }

  getIdentificationTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/settings/user/getIdentificationtypes`);
  }

  createRole(status: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/settings/user/createRole`, {
      status,
      role,
    });
  }

  deleteRole(role: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/user/deleteRole`, {
      body: { role },
    });
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/settings/user/getRoles`);
  }

  createProfile(status: string, profile: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/settings/user/createProfile`, {
      status,
      profile,
    });
  }

  deleteProfile(profile: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/user/deleteProfile`, {
      body: { profile },
    });
  }

  getProfiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/settings/user/getProfiles`);
  }

  private baseUrl = 'http://localhost:3000/settings';
  getSchedulers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/schedulers/getScheduler`);
  }

  createScheduler(scheduler: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/schedulers/createScheduler`,
      scheduler
    );
  }

  updateScheduler(scheduler: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/schedulers/updateScheduler`,
      scheduler
    );
  }

  deleteScheduler(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/schedulers/deleteScheduler`, {
      body: { id },
    });
  }
}
