import { Component, Inject,} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-approve-confirmation-dailog',
  templateUrl: './approve-confirmation-dailog.component.html',
  styleUrls: ['./approve-confirmation-dailog.component.scss']
})
export class ApproveConfirmationDailogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApproveConfirmationDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onConfirm(): void {
    this.dialogRef.close(true);  // Return true when confirmed
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false when canceled
  }
}
