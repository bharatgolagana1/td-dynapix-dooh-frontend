import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-screen',
  templateUrl: './delete-screen.component.html',
  styleUrls: ['./delete-screen.component.scss']
})
export class DeleteScreenComponent {
  constructor(public dialogRef: MatDialogRef<DeleteScreenComponent>) {}
}
