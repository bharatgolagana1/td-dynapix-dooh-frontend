import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreenService } from '../screens.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-create-screens',
  templateUrl: './create-screens.component.html',
  styleUrls: ['./create-screens.component.scss']
})
export class CreateScreensComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  isChecked: boolean = false;

  screenForm!: FormGroup;
  selectedFile: File | null = null;
  imageSrc: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private screensService: ScreenService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.screenForm = this.formBuilder.group({
      ScreenName: ['', Validators.required],
      Address: ['', Validators.required],
      Size: ['', Validators.required],
      SFT: ['', Validators.required],
      NextAvailableDate: ['', Validators.required], 
      localIP: [''],
      MACID: [''],
      lastHeartbeat: [''],
      upTime: [''],
      inSyncStatus: [''],
      hardwareVersion: [''],
      softwareVersion: [''],
      locationCoordinates: ['',],
      rebootFlag: ['',],
      liveMonitoringAddress: ['',],
      imageFiles:['']
    });
  }

  onSubmit(): void {
    if (this.screenForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('imageFiles', this.selectedFile); // Append the selected file
      Object.keys(this.screenForm.value).forEach(key => {
        formData.append(key, this.screenForm.value[key]);
      });
  
      this.screensService.createScreen(formData).subscribe(
        () => {
          this.notificationService.showNotification('Screen created successfully', 'success');
        },
        (error: any) => {
          console.error('Error creating screen: ', error);
          this.notificationService.showNotification('Screen not created', 'error');
        }
      );
    }
  }
  

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    this.updateImageSrc();
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length) {
      this.selectedFile = event.dataTransfer.files[0] as File;
      this.updateImageSrc();
    }
  }
  
  

  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }

  updateImageSrc(): void {
    if (this.selectedFile) {
      // Asynchronously create the object URL
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.imageSrc = null;
    }
  }

  // getImageSrc(): any {
  //   return this.selectedFile ? URL.createObjectURL(this.selectedFile) : '';
  // }
}
