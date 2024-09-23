import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from '../../services/modules.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  moduleForm: FormGroup;
  userData: any

  constructor(
    private fb: FormBuilder,
    private modulesService: ModulesService,
    private notificationService: NotificationService,
    private keycloakOperationService: KeycloakOperationService,
    public dialogRef: MatDialogRef<ModuleComponent>
  ) {
    this.moduleForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  onSubmit() {
    if (this.moduleForm.valid && this.userData.organizationId) {
      const formData = {
        ...this.moduleForm.value,
        organizationId: this.userData.organizationId
      };

      this.modulesService.createModule(formData).subscribe({
        next: () => {
          this.notificationService.showNotification('Module created successfully', 'success');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error creating module:', err);
          this.notificationService.showNotification('Error creating module', 'error');
        }
      });
    } else {
      this.notificationService.showNotification('Invalid form or missing organization ID', 'error');
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
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
}
