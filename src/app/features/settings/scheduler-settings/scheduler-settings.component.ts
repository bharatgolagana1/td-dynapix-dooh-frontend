import { Component } from '@angular/core';

@Component({
  selector: 'app-scheduler-settings',
  templateUrl: './scheduler-settings.component.html',
  styleUrls: ['./scheduler-settings.component.scss'],
})
export class SchedulerSettingsComponent {
  selectedItem: string = 'slotSettings';

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
