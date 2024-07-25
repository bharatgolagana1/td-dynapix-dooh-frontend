import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup;
  genders = ['female', 'male', 'others'];
  identificationTypes: string[] = [];
  roles: string[] = [];
  profiles: string[] = [];

  isSubmitting: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      identificationType: ['', [Validators.required]],
      identificationNo: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      employeeNo: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      profile: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadIdentificationTypes();
    this.loadRoles();
    this.loadProfiles();
  }

  loadIdentificationTypes(): void {
    this.userService.getIdentificationTypes().subscribe(
      (data) => {
        this.identificationTypes = data;
      },
      (error) => {
        console.error('Error fetching identification types:', error);
      }
    );
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  loadProfiles(): void {
    this.userService.getProfiles().subscribe(
      (data) => {
        this.profiles = data;
      },
      (error) => {
        console.error('Error fetching profiles:', error);
      }
    );
  }

  onSubmit() {
    this.isSubmitting = true;
    if (this.createUserForm.valid) {
      this.router.navigate(['/users']);
      this.userService.createUser(this.createUserForm.value).subscribe(
        (response) => {
          console.log('User created successfully:', response);
          this.notificationService.showNotification('User created successfully', 'success');
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Error creating user:', error);
          this.isSubmitting = false;
        }
      );
    } else {
      this.isSubmitting = false;
    }
  }
}
