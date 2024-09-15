import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-date-range-picker-dialog',
  templateUrl: './date-range-picker-dialog.component.html',
  styleUrls: ['./date-range-picker-dialog.component.scss'],
})
export class DateRangePickerDialogComponent {
  customStartDate: Date | null = null;
  customEndDate: Date | null = null;

  campaignStartDate: Date;
  campaignEndDate: Date;

  constructor(
    public dialogRef: MatDialogRef<DateRangePickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { campaignStartDate: string; campaignEndDate: string }
  ) {
    this.campaignStartDate = new Date(data.campaignStartDate);
    this.campaignEndDate = new Date(data.campaignEndDate);
  }

  onCreate(): void {
    if (this.customStartDate && this.customEndDate) {
      this.dialogRef.close({
        startDate: this.customStartDate,
        endDate: this.customEndDate,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
