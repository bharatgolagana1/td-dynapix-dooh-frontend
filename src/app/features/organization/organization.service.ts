import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'http://localhost:3001/organizations';

  constructor(private http: HttpClient) { }

  createOrganization(organization: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, organization);
  }

  getOrganizations(page: number, limit: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search);

    return this.http.get<any>(this.apiUrl, { params });
  }

  getOrganizationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteOrganization(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
