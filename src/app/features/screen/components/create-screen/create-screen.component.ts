import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScreenService } from '../../screen.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-screen',
  templateUrl: './create-screen.component.html',
  styleUrls: ['./create-screen.component.scss'],
  providers: [DatePipe]
})
export class CreateScreenComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  screenForm: FormGroup;
  imageFiles: File[] = [];
  fileUrls: string[] = [];
  tenantId: string = '12345';
  localIP: string = '192.168.1.2';
  MACID: string = '00-B0-D0-63-C2-26';
  lastHeartbeat: string = '60';
  upTime: string = '63';
  inSyncStatus: string = 'synced';
  hardwareVersion: string = '1.0';
  softwareVersion: string = '1.2.3';
  rebootFlag: string = 'true';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private screenService: ScreenService,
    private notificationService: NotificationService,
    public loaderService: LoaderService,
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');  // Set locale for date picker to en-GB (dd/MM/yyyy)
    this.screenForm = this.formBuilder.group({
      screenName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      height: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      SFT: new FormControl({ value: '', disabled: true }, [Validators.required]),
      locationCoordinates: ['', [Validators.required, this.coordinateValidator()]],
      screenStatus: new FormControl('Active', [Validators.required]),
      screenType: new FormControl('', [Validators.required]),
      screenSize: new FormControl('Small', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      nextAvailableDate: new FormControl('', [Validators.required]),
      imageFiles: ['']
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
      const regex = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
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
      formData.append('screenType', this.screenForm.value.screenType);
      formData.append('screenSize', this.screenForm.value.screenSize ? this.screenForm.value.screenSize.toString() : '');
      formData.append('pincode', this.screenForm.value.pincode);
      formData.append('lastHeartbeat', this.lastHeartbeat);
      formData.append('upTime', this.upTime);
      formData.append('inSyncStatus', this.inSyncStatus);
      formData.append('hardwareVersion', this.hardwareVersion);
      formData.append('softwareVersion', this.softwareVersion);
      formData.append('locationCoordinates', this.screenForm.value.locationCoordinates);
      formData.append('screenStatus', this.screenForm.value.screenStatus);
      formData.append('rebootFlag', this.rebootFlag);

      const nextAvailableDate = this.screenForm.value.nextAvailableDate; // Retrieve the date from the form
      const formattedDate = this.datePipe.transform(nextAvailableDate, 'dd/MM/yyyy');
      formData.append('NextAvailableDate', formattedDate || ''); // Ensure fallback in case formattedDate is null

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

  onDateChange(): void {
    const nextAvailableDate = this.screenForm.value.nextAvailableDate;
    if (nextAvailableDate) {
      const formattedDate = this.datePipe.transform(nextAvailableDate, 'dd/MM/yyyy');
      this.screenForm.patchValue({ nextAvailableDate: formattedDate });
    }
  }
  
}
