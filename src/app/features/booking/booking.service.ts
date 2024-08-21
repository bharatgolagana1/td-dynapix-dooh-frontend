import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseApiUrl = environment.baseApiUrl;
  
   private appendOrganizationId(params: any = {}) {
    const organizationId = this.keycloakOperationService.getOrganizationId();
    if (organizationId) {
      params['organizationId'] = organizationId;
    }
    return params;
  }


  constructor(private http: HttpClient ,private keycloakOperationService: KeycloakOperationService) {}

  createBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/booking/create`, bookingData);
  }

  getBookings(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/booking`);
  }

  screensList(filters: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseApiUrl}/screen/api/available-screens`,
      filters
    );
  }

  getDateOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/bookings/date`);
  }

  getScreenTypeOptions(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/bookings/screenType`
    );
  }

  getStatusOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/bookings/status`);
  }

  getSlotSizeOptions(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/bookings/slotSize`
    );
  }

  getCategoryOptions(): Observable<any[]> {
    const params = this.appendOrganizationId();
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/getActiveCategoryOptions`, { params });
  }

  getCustomerNames(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.baseApiUrl}/settings/campaign/getActiveCustomerNames`, { params });
  }

  getExtraSlotSize(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.baseApiUrl}/settings/campaign/getActiveExtraSlotSize`, { params });
  }
}
