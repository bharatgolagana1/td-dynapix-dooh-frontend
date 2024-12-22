import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;
  // private baseApiUrl = 'http://localhost:3000';
  private organizationId = new BehaviorSubject<string | null>(null);
  private userEmail = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<string | null>(null);
  private customerName = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {
    this.loadUserData();
  }
  loadOrgId(orgId: string) {
    this.organizationId.next(orgId);
  }

  getCustomerName(): Observable<string | null> {
    return this.customerName.asObservable();
  }

  loadOrgData(data: any) {
    this.organizationId.next(data.organizationId);
    this.userEmail.next(data.email);
    this.userId.next(data.username);
    this.customerName.next(data?.customerName);
  }

  loadUserData(): Observable<string | null> {
    if (!this.organizationId.value) {
      return this.http.get<any>(`${this.baseApiUrl}/me`).pipe(
        map((response) => {
          const orgId = response.organizationId;
          this.organizationId.next(orgId);
          this.userEmail.next(response.email);
          this.userId.next(response.username);
          this.customerName.next(response?.customerName);
          sessionStorage.setItem('orgId', orgId);
          return orgId;
        })
      );
    } else {
      return this.organizationId.asObservable();
    }
  }

  getOrgId(): Observable<string | null> {
    return this.organizationId;
  }
  getOrgData(): Observable<{
    organizationId: string | null;
    userId: string | null;
    userEmail: string | null;
    customerName: string | null;
  }> {
    return combineLatest([
      this.organizationId.asObservable(),
      this.userId.asObservable(),
      this.userEmail.asObservable(),
      this.customerName.asObservable(),
    ]).pipe(
      map(([organizationId, userId, userEmail, customerName]) => ({
        organizationId,
        userId,
        userEmail,
        customerName,
      }))
    );
  }
}
