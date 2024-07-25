import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private baseApiUrl = environment.baseApiUrl;


  constructor(private http: HttpClient) { }

  createIdentificationType(identificationType: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/settings`, {
      identificationType
    });
  }

  createRole(role: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/settings`, { role });
  }

  createProfile(profile: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/settings`, { profile });
  }

  getIdentificationTypes(): Observable<any> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/identificationtypes`);
  }

  getRoles(): Observable<any> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/roles`);
  }

  getProfiles(): Observable<any> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/profiles`);
  }

  deleteIdentificationType(identificationType: string): Observable<any> {
    const url = `${this.baseApiUrl}/settings/items`;
    return this.http.delete(url, {
      body: { type: 'identificationType', value: identificationType }
    });
  }

  deleteRole(role: string): Observable<any> {
    const url = `${this.baseApiUrl}/settings/items`;
    return this.http.delete(url, {
      body: { type: 'role', value: role }
    });
  }

  deleteProfile(profile: string): Observable<any> {
    const url = `${this.baseApiUrl}/settings/items`;
    return this.http.delete(url, {
      body: { type: 'profile', value: profile }
    });
  }
}
