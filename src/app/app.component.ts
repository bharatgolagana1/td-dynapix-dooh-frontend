import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

interface SubNavState {
  dashboard: boolean;
  users: boolean;
  schedulers: boolean;
  media: boolean;
  screen: boolean;
  booking: boolean;
  organization: boolean;
  roles: boolean;
  settings:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'td-dynapix-dooh-frontend';
  subNavState: SubNavState = {
    dashboard: false,
    users: false,
    schedulers: false,
    media: false,
    screen: false,
    booking: false,
    organization: false,
    roles: false,
    settings: false
  };
  isSidenavOpened = true;
  isSmallScreen = false;
  showToolBar = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private readonly keycloak: KeycloakService
  ) {
    this.router.events.subscribe((event) => {
      if (router.url.includes('public-screens')) {
        this.isSidenavOpened = false;
        this.showToolBar = false;
      }
    });
  }

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  async ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
        this.isSidenavOpened = !this.isSmallScreen;
      });
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.router.navigate([`/${window.location.origin}`]);
    }
  }

  public async login() {
    try {
      await this.keycloak.login();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Keycloak Login Error:', error);
    }
  }

  public async logout() {
    try {
      await this.keycloak.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Keycloak Logout Error:', error);
    }
  }
  toggleSubNav(navName: keyof SubNavState): void {
    this.subNavState[navName] = !this.subNavState[navName];
    if (this.subNavState[navName]) {
      this.router.navigate([`/${navName}`]);
    }
  }

  isSubNavOpen(navName: keyof SubNavState): boolean {
    return this.subNavState[navName];
  }
}
