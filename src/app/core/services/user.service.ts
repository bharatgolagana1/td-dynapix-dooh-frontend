import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;
  // private baseApiUrl = 'http://localhost:3000';
  private organizationId = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadUserData();
  }
  loadOrgId(orgId: string) {
    this.organizationId.next(orgId);
  }

  loadUserData(): Observable<string | null> {
    if (!this.organizationId.value) {
      return this.http.get<any>(`${this.baseApiUrl}/me`).pipe(
        map((response) => {
          const orgId = response.organizationId;
          this.organizationId.next(orgId);
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
}
