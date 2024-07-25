import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class KeycloakOperationService {
  private baseUrl = environment.baseApiUrl;

  constructor(private readonly keycloak: KeycloakService ,private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }
  logout(): void {
    this.keycloak.logout();
  }

  getUserProfile(): any {
    return this.keycloak.loadUserProfile();
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/me`);
  }

}