import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  createUserForm:FormGroup;
  genders = ['female', 'male', 'others'];
  identificationTypes = ['Internal User','Custom','Agent'];
  defaultTypes: string = 'Internal User';
  roles = ['Operations Head(coo)', 'Operations Manager', 'Field Technician', 'Scheduler'];
  defaultRole: string = 'Scheduler';
  profiles = ['Chief Executive Officer (CEO)','Chief Operating Officer (COO)','Chief Financial Officer (CFO)'];
  defaultProfile: string = 'Chief Financial Officer (CFO)';

  isSubmitting: boolean = false;


  constructor(private notificationService: NotificationService ,private formBuilder:FormBuilder, private userService: UserService ,private router: Router){
    this.createUserForm=this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      identificationType:[this.defaultTypes,[Validators.required,]],
      identificationNo:['',[Validators.required]],
      gender:['',[Validators.required]],
      employeeNo:['',[Validators.required]],
      userName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      role:[this.defaultRole,[Validators.required]],
      profile:[this.defaultProfile,[Validators.required]],
     });
  }

  onSubmit() {
    this.isSubmitting = true;
    console.log("form state", this.createUserForm )
    if (this.createUserForm.valid) {
      this.router.navigate(['/users']);
        this.userService.createUser(this.createUserForm.value).subscribe(
            (response) => {
                console.log('User created successfully:', response);
                this.notificationService.showNotification('User created successfully', 'success');
                // Reset form or do any other actions upon successful creation
                this.isSubmitting = false; // Turn off the spinner
                
            },
            (error) => {
                console.error('Error creating user:', error);
                // Handle error response from backend
                this.isSubmitting = false; // Turn off the spinner in case of error too
            }
        );
    } else {
        // In case the form is not valid, turn off the spinner
        this.isSubmitting = false;
    }
}

}
