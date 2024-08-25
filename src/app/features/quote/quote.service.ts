import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient, private keycloakOperationService: KeycloakOperationService) {}

  private appendOrganizationId(params: any = {}) {
    const organizationId = this.keycloakOperationService.getOrganizationId();
    if (organizationId) {
      params['organizationId'] = organizationId;
    }
    return params;
  }
  getScreenTypeOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/screenType`);
  }

  getStatusOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/status`);
  }
  getCustomerNames(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.baseApiUrl}/settings/campaign/getActiveCustomerNames`, { params });
  }

  screensList(filters: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/screen/api/available-screens`, filters);
  }

  createQuote(payload: any): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.post(`${this.baseApiUrl}/api/quote`, payload, { params });
  }
  
}
