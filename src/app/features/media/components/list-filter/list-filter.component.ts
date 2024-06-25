import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent {
  @Output() mediaTypeChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string[]>();
  mediaTypes = [
    { value: 'both', viewValue: 'Both' },
    { value: 'video', viewValue: 'Video' },
    { value: 'image', viewValue: 'Image' }
  ];

  statuses = [
    { value: 'verified', viewValue: 'Verified' },
    { value: 'scheduled', viewValue: 'Scheduled' },
    { value: 'pushed', viewValue: 'Pushed' },
    { value: 'inactive', viewValue: 'Inactive' }
  ];

  selectedMediaType = 'both';
  selectedStatuses: string[] = [];
  allSelected = false;

  onMediaTypeChange(event: any) {
    this.mediaTypeChange.emit(this.selectedMediaType);
  }

  toggleAllStatuses() {
    if (this.allSelected) {
      this.selectedStatuses = [];
    } else {
      this.selectedStatuses = this.statuses.map(status => status.value);
    }
    this.allSelected = !this.allSelected;
  }

  applyFilters() {
    this.statusChange.emit(this.selectedStatuses);
  }
}
