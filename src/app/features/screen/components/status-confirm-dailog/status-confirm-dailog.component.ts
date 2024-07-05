import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-status-confirm-dailog',
  templateUrl: './status-confirm-dailog.component.html',
  styleUrls: ['./status-confirm-dailog.component.scss']
})
export class StatusConfirmDailogComponent  {
  constructor(private dialogRef: MatDialogRef<StatusConfirmDailogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
