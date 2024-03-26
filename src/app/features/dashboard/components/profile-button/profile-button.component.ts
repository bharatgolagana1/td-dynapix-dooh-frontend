import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss'],
})
export class ProfileButtonComponent {
  @Input() imageUrl!: string;
  @Input() name!: string;
  @Input() subtitle!: string;
}
