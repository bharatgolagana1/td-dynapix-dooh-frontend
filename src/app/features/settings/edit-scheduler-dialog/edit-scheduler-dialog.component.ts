import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-scheduler-dialog',
  templateUrl: './edit-scheduler-dialog.component.html',
  styleUrls: ['./edit-scheduler-dialog.component.scss'],
})
export class EditSchedulerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditSchedulerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
