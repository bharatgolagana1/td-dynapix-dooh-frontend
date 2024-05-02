import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise(async (resolve) => {
      try {
        const authenticated = await this.keycloak.isLoggedIn();
        if (authenticated) {
          resolve(true);
        } else {
          await this.keycloak.login();
          resolve(false);
        }
      } catch (error) {
        console.error('Keycloak Auth Guard Error:', error);
        this.router.navigate(['/']);
        resolve(false);
      }
    });
  }
}
