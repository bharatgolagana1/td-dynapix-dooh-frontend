import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class KeycloakOperationService {
  private baseUrl = environment.baseApiUrl;
  private organizationId: string | null = null; 

  constructor(private readonly keycloak: KeycloakService, private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  logout(): void {
    this.keycloak.logout();
    this.organizationId = null;
    localStorage.removeItem('organizationId'); 
  }

  getUserProfile(): any {
    return this.keycloak.loadUserProfile();
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/me`).pipe(
      tap(user => {
        this.organizationId = user.organizationId; 
        localStorage.setItem('organizationId', user.organizationId); 
      })
    );
  }

  getOrganizationId(): string | null {
    return this.organizationId || localStorage.getItem('organizationId');
  }
}
