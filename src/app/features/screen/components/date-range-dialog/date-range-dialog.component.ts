import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-date-range-dialog',
  templateUrl: './date-range-dialog.component.html',
  styleUrls: ['./date-range-dialog.component.scss']
})
export class DateRangeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DateRangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onApply(): void {
    this.dialogRef.close(this.data);
  }

  onReset(): void {
    this.data.fromDate = null;
    this.data.toDate = null;
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
