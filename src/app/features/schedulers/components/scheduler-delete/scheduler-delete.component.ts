import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-scheduler-delete',
  templateUrl: './scheduler-delete.component.html',
  styleUrls: ['./scheduler-delete.component.scss']
})
export class SchedulerDeleteComponent {
  constructor(public dialogRef: MatDialogRef<SchedulerDeleteComponent>) {}
}
