import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog-public-case',
  templateUrl: './delete-dialog-public-case.component.html',
  styleUrls: ['./delete-dialog-public-case.component.scss']
})
export class DeleteDialogPublicCaseComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogPublicCaseComponent>) {}

}
