import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseApiUrl = environment.baseApiUrl;


  constructor(private http: HttpClient) {}

  createBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/booking/create`, bookingData);
  }

  updateBooking(bookingId: string, bookingData: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/booking/${bookingId}`, bookingData);
  }

  getBookings(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/booking`);
  }

  getBookingDetails(bookingId: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/booking/${bookingId}`);
  }

  
  screensList(filters: any): Observable<any> {
    let params = new HttpParams();
    if (filters.addressOrPincode) {
      params = params.append('addressOrPincode', filters.addressOrPincode);
    }
    if (filters.screenType !== 'Both') {
      params = params.set('screenType', filters.screenType);
    }
    if (filters.size !== 'All') {
      params = params.set('size', filters.size);
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
  };

  getDateOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/bookings/date`);
  }

  getScreenTypeOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/bookings/screenType`);
  }

  getStatusOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/bookings/status`);
  }

  getCategoryOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/bookings/category`);
  }

  getSlotSizeOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/bookings/slotSize`);
  }
}
