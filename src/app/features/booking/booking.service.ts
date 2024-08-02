import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseApiUrl = environment.baseApiUrl;
  // private baseLocalApiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

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

  getCategoryOptions(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/bookings/category`
    );
  }

  getSlotSizeOptions(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/bookings/slotSize`
    );
  }
}
