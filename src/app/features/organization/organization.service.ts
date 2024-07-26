import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  createOrganization(organization: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/organizations`, organization);
  }

  getOrganizations(page: number, limit: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search);

    return this.http.get<any>(`${this.baseUrl}/organizations`, { params });
  }

  getOrganizationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/organizations/${id}`);
  }

  deleteOrganization(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/organizations/${id}`);
  }
}
