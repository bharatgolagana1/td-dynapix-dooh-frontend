import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  // private baseApiUrl = environment.baseApiUrl;

  private baseApiUrl = `http://localhost:3000`;
  constructor(
    private http: HttpClient,
    private keycloakOperationService: KeycloakOperationService
  ) {}

  getScreenTypeOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/screenType`);
  }

  getStatusOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/status`);
  }
  getCustomerNames(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/settings/campaign/getActiveCustomerNames`);
  }
  getTermsAndConditions(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/api/terms-and-conditions`);
  }
  screensList(filters: any): Observable<any> {
    return this.http.post(
      `${this.baseApiUrl}/screen/api/available-screens`,
      filters
    );
  }
  getQuotes(filters: any): Observable<any[]> {
    let params = new HttpParams();
    
    if (filters.customerName) {
      params = params.set('customerName', filters.customerName);
    }
    if (filters.city) {
      params = params.set('city', filters.city);
    }
    if (filters.network) {
      params = params.set('network', filters.network);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }

    return this.http.get<any[]>(`${this.baseApiUrl}/api/quote`, { params });
  }
  createQuote(payload: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/api/quote`, payload);
  }

  deleteQuote(quoteId: string) {
    return this.http.delete(`${this.baseApiUrl}/api/quote/${quoteId}`);
  }
}
