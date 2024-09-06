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

  getMediaIdentity():  Observable<any> {
    return this.http.get(`${this.baseApiUrl}/settings/quote/getActiveMediaIdentity`);
  }

  getCityNames(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/settings/screen/getActiveCityNames`);
  }

  getScreenNetworks(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/settings/screen/getActiveScreenNetworks`);
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

  getQuoteById(quoteId: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/quote/${quoteId}`);
  }

  getScreensByFilters(filters: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/screen`, { params: filters });
  }

  getActiveScreenNetworks(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/settings/screen/getActiveScreenNetworks`);
  }

  updateQuote(quoteId: string, quoteData: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/api/quote/${quoteId}`, quoteData);
  }
  
  getActiveCityNames(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/settings/screen/getActiveCityNames`);
  }

  deleteQuote(quoteId: string) {
    return this.http.delete(`${this.baseApiUrl}/api/quote/${quoteId}`);
  }

  getScreensList(filters: any): Observable<any> {
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
    return this.http.get<any>(`${this.baseApiUrl}/screen`, { params });
  }
}
