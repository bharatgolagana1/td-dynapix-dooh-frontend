import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedulerService } from '../scheduler.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-screen',
  templateUrl: './update-screen.component.html',
  styleUrls: ['./update-screen.component.scss']
})
export class UpdateScreenComponent implements OnInit  {
  @ViewChild('fileInput') fileInput!: ElementRef;

  screenId!: string;
  screenForm: FormGroup;
  imageFiles: File[] = [];
  fileUrls: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private schedulerService:SchedulerService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.screenForm = this.formBuilder.group({
      screenName: ['', Validators.required],
      address: ['', Validators.required],
      size: ['', Validators.required],
      SFT: ['', Validators.required],
      NextAvailableDate: ['', Validators.required],
      locationCoordinates: ['', [Validators.required, this.coordinateValidator()]],
      screenStatus: ['Active', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.screenId = params['id'];
      this.fetchScreenDetails(this.screenId);
    });
  }

  fetchScreenDetails(screenId: string): void {
    this.schedulerService.getScreenDetails(screenId).subscribe(
      (data: any) => {
        const screen = data.screen;
        this.screenForm.patchValue({
          screenName: screen.screenName,
          address: screen.address,
          size: screen.size,
          SFT: screen.SFT,
          NextAvailableDate: screen.NextAvailableDate,
          locationCoordinates: screen.locationCoordinates,
          screenStatus: screen.screenStatus
        });
        // Load images
        this.loadImages(screen.imageUrls);
      },
      error => {
        console.error('Error fetching screen details:', error);
        this.notificationService.showNotification('Error fetching screen details', 'error');
      }
    );
  }

  loadImages(imageUrls: string[]): void {
    this.fileUrls = imageUrls;
  }
  removeImage(index: number): void {
    // Remove the image URL and corresponding file from arrays
    this.fileUrls.splice(index, 1);
    this.imageFiles.splice(index, 1);
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
      formData.append('screenName', this.screenForm.value.screenName);
      formData.append('address', this.screenForm.value.address);
      formData.append('size', this.screenForm.value.size);
      formData.append('SFT', this.screenForm.value.SFT);
      formData.append('NextAvailableDate', this.screenForm.value.NextAvailableDate);
      formData.append('locationCoordinates', this.screenForm.value.locationCoordinates);
      formData.append('screenStatus', this.screenForm.value.screenStatus);
  
      // Append image files
      if (this.imageFiles && this.imageFiles.length > 0) {
        for (let i = 0; i < this.imageFiles.length; i++) {
          formData.append('imageFiles', this.imageFiles[i]);
        }
      }
  
      this.schedulerService.updateScreen(this.screenId, formData).subscribe(
        response => {
          console.log('Screen updated successfully:', response);
          this.notificationService.showNotification('Screen updated successfully', 'success');
          this.router.navigate(['/schedulers/createScheduler']);
        },
        error => {
          console.error('Error updating screen:', error);
          this.notificationService.showNotification('Error updating screen', 'error');
        }
      );
    } else {
      // Form is invalid, handle validation errors
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    for (const file of files) {
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
  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }

  getFileUrl(file: File): string {
    const index = this.imageFiles.indexOf(file);
    return this.fileUrls[index];
  }

  createObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }
}
