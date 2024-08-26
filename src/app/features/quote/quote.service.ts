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
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/campaign/screenType`
    );
  }

  getStatusOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/status`);
  }
  getCustomerNames(): Observable<any> {
    return this.http.get(
      `${this.baseApiUrl}/settings/campaign/getActiveCustomerNames`
    );
  }

  screensList(filters: any): Observable<any> {
    return this.http.post(
      `${this.baseApiUrl}/screen/api/available-screens`,
      filters
    );
  }

  createQuote(payload: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/api/quote`, payload);
  }
}
