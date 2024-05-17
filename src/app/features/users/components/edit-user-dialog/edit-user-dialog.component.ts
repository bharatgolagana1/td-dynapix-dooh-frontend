import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../list-user/list-user.component';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {

  createUserForm: FormGroup;
  isSubmitting = false;
  roles = ['operationshead(coo)', 'operationsmanager', 'fieldtechnician', 'scheduler'];
 
  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private fb: FormBuilder,
  ) {

    this.createUserForm = this.fb.group({
      firstName: [data.user.firstName, Validators.required],
      lastName: [data.user.lastName, Validators.required],
      userName: [data.user.userName, Validators.required],
      role:[data.user.role,[Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.isSubmitting = true;
      const updatedUser: User = {
        ...this.data.user,
        ...this.createUserForm.value,
        updatedAt: new Date(),
      };

      this.dialogRef.close(updatedUser); 
    }
  }
}
