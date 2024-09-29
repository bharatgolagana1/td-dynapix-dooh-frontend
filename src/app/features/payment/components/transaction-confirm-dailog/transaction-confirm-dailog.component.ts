import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-confirm-dailog',
  templateUrl: './transaction-confirm-dailog.component.html',
  styleUrls: ['./transaction-confirm-dailog.component.scss']
})
export class TransactionConfirmDailogComponent {

  constructor(
    public dialogRef: MatDialogRef<TransactionConfirmDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);  
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }
}
