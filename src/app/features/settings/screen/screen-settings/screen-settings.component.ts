import { Component } from '@angular/core';

@Component({
  selector: 'app-screen-settings',
  templateUrl: './screen-settings.component.html',
  styleUrls: ['./screen-settings.component.scss']
})
export class ScreenSettingsComponent {
  selectedItem: string = 'cityName';

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
