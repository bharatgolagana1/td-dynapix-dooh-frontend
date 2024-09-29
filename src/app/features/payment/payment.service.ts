import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseApiUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) {}

  addTransaction(paymentData: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/api/payment`, paymentData);
  }

  getTransactionsByCampaignId(campaignId: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/payment/${campaignId}`);
  }
}
