import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface SubNavState {
  dashboard: boolean;
  users: boolean;
  schedulers: boolean;
  media: boolean;
  screen: boolean;
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
    screen: false
  };
  isSidenavOpened = true;
  isSmallScreen = false;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        this.isSidenavOpened = !this.isSmallScreen;
      });
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
