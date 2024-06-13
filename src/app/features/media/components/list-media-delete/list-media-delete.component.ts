import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-list-media-delete',
  templateUrl: './list-media-delete.component.html',
  styleUrls: ['./list-media-delete.component.scss']
})
export class ListMediaDeleteComponent {
  constructor(public dialogRef: MatDialogRef<ListMediaDeleteComponent>) {}
}
