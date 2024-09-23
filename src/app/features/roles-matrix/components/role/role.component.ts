import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RolesService } from '../../services/roles.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleForm: FormGroup;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private notificationService: NotificationService,
    private keycloakOperationService: KeycloakOperationService,
    private dialogRef: MatDialogRef<RoleComponent>
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], 
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.keycloakOperationService.getUserData().subscribe({
      next: (data) => {
        if (data && data.userId && data.email && data.organizationId) {
          this.userData = {
            organizationId: data.organizationId,
          };
          console.log('User data fetched and set:', this.userData);
        } else {
          console.error('Incomplete user data received:', data);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching user data:', err);
      },
    });
  }

  createRole() {
    if (this.roleForm.valid && this.userData?.organizationId) {
      const roleData = {
        ...this.roleForm.value,
        organizationId: this.userData.organizationId,
      };

      this.rolesService.createRoles(roleData).subscribe({
        next: () => {
          this.notificationService.showNotification('Role created successfully!', 'success');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.notificationService.showNotification('Error creating role.', 'error');
        },
      });
    } else {
      this.notificationService.showNotification('User data is incomplete or form is invalid.', 'error');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
