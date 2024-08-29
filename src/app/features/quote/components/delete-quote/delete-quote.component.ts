import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-quote',
  templateUrl: './delete-quote.component.html',
  styleUrls: ['./delete-quote.component.scss']
})
export class DeleteQuoteComponent {
  constructor(public dialogRef: MatDialogRef<DeleteQuoteComponent>) {}
}
