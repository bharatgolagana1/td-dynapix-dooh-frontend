import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-notfound',
  templateUrl: './server-notfound.component.html',
  styleUrls: ['./server-notfound.component.scss']
})
export class ServerNotfoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/dashboard']);
  }
}
