import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScreenService } from '../../screen.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-screen',
  templateUrl: './create-screen.component.html',
  styleUrls: ['./create-screen.component.scss']
})
export class CreateScreenComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  screenForm: FormGroup;
  imageFiles: File[] = []; 
  fileUrls: string[] = [];
  tenantId: string = '12345';
  localIP: string = '192.168.1.2'
  MACID: string ='00-B0-D0-63-C2-26';
  lastHeartbeat: string = '60';
  upTime: string = '63';
  inSyncStatus: string = 'synced';
  hardwareVersion: string = '1.0';
  softwareVersion: string ='1.2.3';
  rebootFlag: string ='true';


  constructor(private formBuilder: FormBuilder,private router: Router,private screenService: ScreenService,private notificationService: NotificationService) {  
  this.screenForm = this.formBuilder.group({
    screenName: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    size: new FormControl('',[Validators.required]),
    SFT: new FormControl('',[Validators.required]),
    NextAvailableDate: new FormControl('2024-05-01',[Validators.required]), // Set default date
    locationCoordinates: ['', [Validators.required, this.coordinateValidator()]],
    screenStatus: new FormControl('Active', [Validators.required]),
    imageFiles:  ['']
  });
}

coordinateValidator() {
  return (control: { value: string }) => {
    const value = control.value;
    if (!value || value.trim() === '') {
      return null; // Allow empty value
    }
    const regex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6},\s*-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;
    if (!regex.test(value)) {
      return { invalidCoordinate: true };
    }
    return null;
  };
}

onSubmit() {
  if (this.screenForm.valid) {
    
    const formData = new FormData();
    formData.append('tenantId', this.tenantId); // Add tenantId here
    formData.append('screenName', this.screenForm.value.screenName);
    formData.append('address', this.screenForm.value.address);
    formData.append('size', this.screenForm.value.size);
    formData.append('SFT', this.screenForm.value.SFT);
    formData.append('ID', this.screenForm.value.ID);
    formData.append('localIP', this.localIP);
    formData.append('MACID', this.MACID);
    formData.append('lastHeartbeat', this.lastHeartbeat); // Handle null case
    formData.append('upTime', this.upTime);
    formData.append('inSyncStatus', this.inSyncStatus);
    formData.append('hardwareVersion', this.hardwareVersion);
    formData.append('softwareVersion', this.softwareVersion);
    formData.append('locationCoordinates', this.screenForm.value.locationCoordinates);
    formData.append('screenStatus', this.screenForm.value.screenStatus);
    formData.append('rebootFlag', this.rebootFlag); 
    
  // Append image files
  if (this.imageFiles && this.imageFiles.length > 0) {
    for (let i = 0; i < this.imageFiles.length; i++) {
      formData.append('imageFiles', this.imageFiles[i]); 
    }
  }

    this.screenService.createScreen(formData).subscribe(
      response => {
        console.log('Screen created successfully:', response);
        // Handle success
        this.notificationService.showNotification('Screen created successfully', 'success');
        this.router.navigate(['/schedulers/createScheduler']);
      },
      error => {
        console.error('Error creating screen:', error);
        this.notificationService.showNotification('Screen is not created', 'error');
        // Handle error
      }
    );
  } else {
    // Form is invalid
  }
}

onFileSelected(event: any): void {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    this.imageFiles.push(file);
    this.fileUrls.push(this.createObjectURL(file));
  }
}
onFileDropped(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
  if (event.dataTransfer && event.dataTransfer.files.length) {
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.imageFiles.push(file);
      this.fileUrls.push(this.createObjectURL(file)); 
    }
  }
}
getFileUrl(file: File): string {
  const index = this.imageFiles.indexOf(file);
  return this.fileUrls[index];
}
createObjectURL(file: File): string {
  return URL.createObjectURL(file);
}
  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }
  openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }
  
  

}
