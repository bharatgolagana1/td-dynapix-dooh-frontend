import { Component } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  selectedItem:  string = 'identificationType';

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
