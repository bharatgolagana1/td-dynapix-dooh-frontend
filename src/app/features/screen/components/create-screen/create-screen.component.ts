import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScreenService } from '../../screen.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
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


  constructor(private formBuilder: FormBuilder,private router: Router,private screenService: ScreenService,private notificationService: NotificationService,public loaderService:LoaderService) {  
  this.screenForm = this.formBuilder.group({
    screenName: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    width: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    height: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    SFT: new FormControl({ value: '', disabled: true }, [Validators.required]),
    NextAvailableDate: new FormControl('2024-05-01',[Validators.required]), 
    locationCoordinates: ['', [Validators.required, this.coordinateValidator()]],
    screenStatus: new FormControl('Active', [Validators.required]),
    companyName: new FormControl('',[Validators.required]),
    bottomOfTheScreenHeightFromGround: new FormControl('',[Validators.required]),
    indoorOutdoor: new FormControl('',[Validators.required]),
    imageFiles:  ['']
  });
  this.screenForm.valueChanges.subscribe(() => {
    this.updateSFT();
  });
}

coordinateValidator() {
  return (control: { value: string }) => {
    const value = control.value;
    if (!value || value.trim() === '') {
      return null; 
    }
    const regex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6},\s*-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;
    if (!regex.test(value)) {
      return { invalidCoordinate: true };
    }
    return null;
  };
}


updateSFT() {
  const width = this.screenForm.get('width')?.value;
  const height = this.screenForm.get('height')?.value;

  if (width && height && !isNaN(width) && !isNaN(height)) {
    const sft = Number(width) * Number(height);
    if (this.screenForm.get('SFT')?.value !== sft) {
      this.screenForm.patchValue({ SFT: sft }, { emitEvent: false });
    }
  } else {
    this.screenForm.patchValue({ SFT: '' }, { emitEvent: false });
  }
}

onSubmit() {
  if (this.screenForm.valid) {
    this.loaderService.showLoader(); 
    const formData = new FormData();
    formData.append('tenantId', this.tenantId);
    formData.append('screenName', this.screenForm.value.screenName);
    formData.append('address', this.screenForm.value.address);
    formData.append('width', this.screenForm.value.width ? this.screenForm.value.width.toString() : '');
    formData.append('height', this.screenForm.value.height ? this.screenForm.value.height.toString() : '');
    formData.append('SFT', this.screenForm.value.SFT ? this.screenForm.value.SFT.toString() : '');
    formData.append('localIP', this.localIP);
    formData.append('MACID', this.MACID);
    formData.append('companyName', this.screenForm.value.companyName);
    formData.append('bottomOfTheScreenHeightFromGround', this.screenForm.value.bottomOfTheScreenHeightFromGround ? this.screenForm.value.bottomOfTheScreenHeightFromGround.toString() : '');
    formData.append('indoorOutdoor', this.screenForm.value.indoorOutdoor);
    formData.append('lastHeartbeat', this.lastHeartbeat);
    formData.append('upTime', this.upTime);
    formData.append('inSyncStatus', this.inSyncStatus);
    formData.append('hardwareVersion', this.hardwareVersion);
    formData.append('softwareVersion', this.softwareVersion);
    formData.append('locationCoordinates', this.screenForm.value.locationCoordinates);
    formData.append('screenStatus', this.screenForm.value.screenStatus);
    formData.append('rebootFlag', this.rebootFlag);

    if (this.imageFiles && this.imageFiles.length > 0) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        formData.append('imageFiles', this.imageFiles[i]);
      }
    }

    this.screenService.createScreen(formData).subscribe(
      response => {
        console.log('Screen created successfully:', response);
        this.notificationService.showNotification('Screen created successfully', 'success');
        this.loaderService.hideLoader();  
        this.router.navigate(['/schedulers/createScheduler']);
      },
      error => {
        console.error('Error creating screen:', error);
        this.notificationService.showNotification('Screen is not created', 'error');
        this.loaderService.hideLoader();  
      }
    );
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
  
  removeFile(index: number): void {
    this.imageFiles.splice(index, 1);
    this.fileUrls.splice(index, 1);
  }
  

}
