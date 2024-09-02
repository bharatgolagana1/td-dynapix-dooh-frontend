import { Component } from '@angular/core';

@Component({
  selector: 'app-quote-settings',
  templateUrl: './quote-settings.component.html',
  styleUrls: ['./quote-settings.component.scss']
})
export class QuoteSettingsComponent {
  selectedItem: string = '';

  ngOnInit() {
    this.selectedItem = 'terms&conditions';
  }

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
