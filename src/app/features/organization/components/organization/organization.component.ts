import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../../organization.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {
  organizationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private notificationService: NotificationService,
    public loaderService: LoaderService,
    private router: Router
  ) {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Active', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      organizationId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.organizationForm.valid) {
      this.organizationService.createOrganization(this.organizationForm.value).subscribe(response => {
        console.log('Organization created', response);
        this.notificationService.showNotification('Organization created successfully', 'success');
        this.router.navigate(['/organization']);
      });
    }
    else{
      console.error('Error creating Organization:', 'error');
      this.notificationService.showNotification('Organization is not created', 'error');
    }
  }
}
