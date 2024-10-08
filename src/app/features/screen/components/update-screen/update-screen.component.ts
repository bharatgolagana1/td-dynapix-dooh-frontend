import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { ScreenService } from '../../screen.service';
@Component({
  selector: 'app-update-screen',
  templateUrl: './update-screen.component.html',
  styleUrls: ['./update-screen.component.scss']
})
export class UpdateScreenComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  screenId!: string;
  screenForm: FormGroup;
  imageFiles: File[] = [];
  fileUrls: string[] = [];
  removedImageUrls: string[] = []; 
  cityNames: any[] = [];
  screenCategories: any[] = [];
  screenNetworks: any[] = [];
  schedulers: any[] = [];
  slotSize: string = '';
  cycleTime: string = '';
  states: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private screenService:ScreenService,
    private notificationService: NotificationService
  ) {
    this.screenForm = this.formBuilder.group({
      screenName: new FormControl({ value: '', disabled: true }),
      screenType:['', Validators.required],
      screenSize:['', Validators.required],
      address: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      SFT: [{ value: '', disabled: true }, Validators.required],
      NextAvailableDate: ['', Validators.required],
      locationCoordinates: ['', [Validators.required, this.coordinateValidator()]],
      screenStatus: ['Active', Validators.required],
      cityName:  ['', Validators.required],
      screenCategory: ['', Validators.required],
      screenNetwork: ['', Validators.required],
      cardRate: new FormControl(null, [Validators.required]),
      minimumPrice: new FormControl(null, [Validators.required]),
      footfallPerMonth: new FormControl(null, [Validators.required]),
      footfallPerDay: new FormControl(null, [Validators.required]),
      locality: new FormControl('', [Validators.required]),     
      schedulerId: new FormControl({ value: '', disabled: true }),
      slotSize: new FormControl({ value: '', disabled: true }),
      cycleTime: new FormControl({ value: '', disabled: true }),
      widthInPixels: ['', Validators.required],
      heightInPixels: ['', Validators.required],
      state: ['', Validators.required],
      pincode: new FormControl('', [Validators.required]),
    });

    this.screenForm.get('width')?.valueChanges.subscribe(() => {
      this.updateSFT();
    });

    this.screenForm.get('height')?.valueChanges.subscribe(() => {
      this.updateSFT();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.screenId = params['id'];
      this.fetchScreenDetails(this.screenId);
    });
    this.loadCityNames();
    this.loadScreenCategories();
    this.loadScreenNetwork();
    this.loadSchedulers();
    this.loadState();
  }


  loadState(): void {
    this.screenService.getActiveStates().subscribe(
      (data: { states: any[] }) => {
        this.states = data.states;
      },
      (error) => {
        console.error('Error fetching customer names:', error);
      }
    );
  }


  loadSchedulers() {
    this.screenService.getSchedulers().subscribe((data) => {
      // @ts-ignore
      this.schedulers = data?.schedulers;
    });
  }
    
  loadCityNames(): void {
    this.screenService.getActiveCityNames().subscribe(
      (data: { cityNames: any[] }) => {
        this.cityNames = data.cityNames;
      },
      (error) => {
        console.error('Error fetching customer names:', error);
      }
    );
  }

  loadScreenNetwork(): void {
    this.screenService.getActiveScreenNetworks().subscribe(
      (data: { screenNetworks: any[] }) => {
        this.screenNetworks = data.screenNetworks;
      },
      (error) => {
        console.error('Error fetching customer names:', error);
      }
    );
  }

  loadScreenCategories(): void {
    this.screenService.getActiveScreenCategories().subscribe(
      (data: { screenCategories: any[] }) => {
        this.screenCategories = data.screenCategories;
      },
      (error) => {
        console.error('Error fetching customer names:', error);
      }
    );
  }

  fetchScreenDetails(screenId: string): void {
    this.screenService.getScreenDetails(screenId).subscribe(
      (data: any) => {
        const screen = data.screen;
        this.screenForm.patchValue({
          screenName: screen.screenName,
          screenType:screen.screenType,
          address: screen.address,
          width: screen.size.split('x')[0],
          height: screen.size.split('x')[1],
          NextAvailableDate: screen.NextAvailableDate,
          locationCoordinates: screen.locationCoordinates,
          screenStatus: screen.screenStatus,
          cityName:screen.cityName,
          screenCategory:screen.screenCategory,
          screenNetwork:screen.screenNetwork,
          schedulerId:screen.schedulerId,
          cardRate:screen.cardRate,
          minimumPrice:screen.minimumPrice,
          footfallPerMonth:screen.footfallPerMonth,
          footfallPerDay:screen.footfallPerDay,
          locality:screen.locality,
          slotSize:screen.slotSize,
          cycleTime:screen.cycleTime,
          widthInPixels:screen.widthInPixels,
          heightInPixels:screen.heightInPixels,
          state:screen.state,
          pincode:screen.pincode,
          screenSize:screen.screenSize
        });
        this.updateSFT();
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
    const removedUrl = this.fileUrls[index];
    this.removedImageUrls.push(removedUrl);
    this.fileUrls.splice(index, 1);
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

  updateSFT(): void {
    const width = this.screenForm.get('width')?.value;
    const height = this.screenForm.get('height')?.value;
    if (width && height) {
      const sft = (parseFloat(width) * parseFloat(height)).toFixed(2);
      this.screenForm.get('SFT')?.setValue(sft);
    } else {
      this.screenForm.get('SFT')?.setValue('');
    }
  }

  onSubmit(): void {
    if (this.screenForm.valid) {
      const formData = new FormData();
      formData.append('screenName', this.screenForm.value.screenName);
      formData.append('screenType', this.screenForm.value.screenType);
      formData.append('screenSize', this.screenForm.value.screenSize);
      formData.append('cityName', this.screenForm.value.cityName);
      formData.append('screenCategory', this.screenForm.value.screenCategory);
      formData.append('screenNetwork', this.screenForm.value.screenNetwork);
      formData.append('cardRate', this.screenForm.value.cardRate);
      formData.append('minimumPrice', this.screenForm.value.minimumPrice);
      formData.append('footfallPerMonth', this.screenForm.value.footfallPerMonth);
      formData.append('footfallPerDay', this.screenForm.value.footfallPerDay);
      formData.append('locality', this.screenForm.value.locality);
      formData.append('screenStatus', this.screenForm.value.screenStatus);
      formData.append('width', this.screenForm.value.width);
      formData.append('height', this.screenForm.value.height);
      formData.append('SFT', this.screenForm.get('SFT')?.value);
      formData.append('schedulerId', this.screenForm.value.schedulerId);
      formData.append('slotSize', this.screenForm.value.slotSize);
      formData.append('cycleTime', this.screenForm.value.cycleTime);
      formData.append('NextAvailableDate', this.screenForm.value.NextAvailableDate);
      formData.append('widthInPixels', this.screenForm.value.widthInPixels);
      formData.append('heightInPixels', this.screenForm.value.heightInPixels);
      formData.append('state', this.screenForm.value.state);
      formData.append('locationCoordinates', this.screenForm.value.locationCoordinates);
      formData.append('pincode', this.screenForm.value.pincode);
      formData.append('address', this.screenForm.value.address);

      if (this.imageFiles && this.imageFiles.length > 0) {
        for (let i = 0; i < this.imageFiles.length; i++) {
          formData.append('imageFiles', this.imageFiles[i]);
        }
      }

      if (this.removedImageUrls.length > 0) {
        formData.append('removeImageUrls', JSON.stringify(this.removedImageUrls));
      }

      this.screenService.updateScreen(this.screenId, formData).subscribe(
        response => {
          console.log('Screen updated successfully:', response);
          this.notificationService.showNotification('Screen updated successfully', 'success');
          this.router.navigate(['/screen']);
        },
        error => {
          console.error('Error updating screen:', error);
          console.error('Full error response:', error);
          if (error.error && error.error.message) {
            this.notificationService.showNotification(`Error: ${error.error.message}`, 'error');
          } else {
            this.notificationService.showNotification('Error updating screen', 'error');
          }
        }
      );
    } else {
      Object.keys(this.screenForm.controls).forEach(field => {
        const control = this.screenForm.get(field);
        if (control && control.invalid) {
          control.markAsTouched({ onlySelf: true });
        }
      });
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


  onSchedulerChange(event: any): void {
    const schedulerId = event.value;
    console.log('scheduler Id', schedulerId, event.value);
    const selectedScheduler = this.schedulers.find(
      (scheduler) => scheduler._id === schedulerId
    );

    if (selectedScheduler) {
      this.slotSize = selectedScheduler.slotSize;
      this.cycleTime = selectedScheduler.cycleTime;
      this.screenForm.patchValue({
        slotSize: selectedScheduler.slotSize,
        cycleTime: selectedScheduler.cycleTime,
      });
    }
  }
}
