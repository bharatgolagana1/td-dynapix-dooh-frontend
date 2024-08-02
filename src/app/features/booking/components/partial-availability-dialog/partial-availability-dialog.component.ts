import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-partial-availability-dialog',
  templateUrl: './partial-availability-dialog.component.html',
  styleUrls: ['./partial-availability-dialog.component.scss'],
})
export class PartialAvailabilityDialogComponent {
  selectedDates: Date[] = [];

  constructor(
    public dialogRef: MatDialogRef<PartialAvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { availability: { date: Date; availableSlots: number }[] }
  ) {}

  onDateSelect(date: Date): void {
    const index = this.selectedDates.indexOf(date);
    if (index >= 0) {
      this.selectedDates.splice(index, 1);
    } else {
      this.selectedDates.push(date);
    }
  }

  onSave(): void {
    this.dialogRef.close({ selectedDates: this.selectedDates });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
