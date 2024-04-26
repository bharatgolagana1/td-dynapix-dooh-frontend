import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SubNavState {
  dashboard: boolean;
  users: boolean;
  schedulers: boolean;
  media : boolean;
  screen:boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'td-dynapix-dooh-frontend';
  subNavState: SubNavState = {
    dashboard: false,
    users: false,
    schedulers: false,
    media:false,
    screen:false
  };

  constructor(private router: Router) {}

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
