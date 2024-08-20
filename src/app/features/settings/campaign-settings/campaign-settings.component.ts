import { Component } from '@angular/core';

@Component({
  selector: 'app-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.scss']
})
export class CampaignSettingsComponent {
  selectedItem:  string = 'customerName';

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
