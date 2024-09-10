import { Component } from '@angular/core';

@Component({
  selector: 'app-public-case-settings',
  templateUrl: './public-case-settings.component.html',
  styleUrls: ['./public-case-settings.component.scss']
})
export class PublicCaseSettingsComponent {
  selectedItem: string = 'caseType';

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
