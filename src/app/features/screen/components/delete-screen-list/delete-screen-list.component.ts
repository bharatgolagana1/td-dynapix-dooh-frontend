import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-screen-list',
  templateUrl: './delete-screen-list.component.html',
  styleUrls: ['./delete-screen-list.component.scss']
})
export class DeleteScreenListComponent {
  constructor(public dialogRef: MatDialogRef<DeleteScreenListComponent>) {}
}
