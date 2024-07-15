import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-organization',
  templateUrl: './delete-organization.component.html',
  styleUrls: ['./delete-organization.component.scss']
})
export class DeleteOrganizationComponent {
  constructor(public dialogRef: MatDialogRef<DeleteOrganizationComponent>) {}
}
