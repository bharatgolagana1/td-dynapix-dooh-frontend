import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ScreenService } from '../../screen.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-screen',
  templateUrl: './create-screen.component.html',
  styleUrls: ['./create-screen.component.scss'],
  providers: [DatePipe],
})
export class CreateScreenComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  screenForm: FormGroup;
  imageFiles: File[] = [];
  fileUrls: string[] = [];
  localIP: string = '192.168.1.2';
  MACID: string = '00-B0-D0-63-C2-26';
  lastHeartbeat: string = '60';
  upTime: string = '63';
  inSyncStatus: string = 'synced';
  hardwareVersion: string = '1.0';
  softwareVersion: string = '1.2.3';
  rebootFlag: string = 'true';
  schedulers: any[] = [];
  slotSize: string = '';
  cycleTime: string = '';
  cityNames: any[] = [];
  screenCategories: any[] = [];
  screenNetworks: any[] = [];
  cardinalPoints: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  tags: string[] = [];
  states: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private screenService: ScreenService,
    private notificationService: NotificationService,
    public loaderService: LoaderService,
    private datePipe: DatePipe,
    private userService: UserService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
    this.screenForm = this.formBuilder.group({
      screenName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      width: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      height: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      SFT: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      locationCoordinates: [
        '',
        [Validators.required, this.coordinateValidator()],
      ],
      screenStatus: new FormControl('Active', [Validators.required]),
      screenType: new FormControl('', [Validators.required]),
      screenSize: new FormControl('Small', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      nextAvailableDate: new FormControl('', [Validators.required]),
      schedulerId: new FormControl('', [Validators.required]),
      slotSize: new FormControl({ value: '', disabled: true }),
      cycleTime: new FormControl({ value: '', disabled: true }),
      imageFiles: [''],
      cityName: new FormControl('', [Validators.required]),
      screenCategory: new FormControl('', [Validators.required]),
      screenNetwork: new FormControl('', [Validators.required]),
      cardinalPoint: new FormControl('', [Validators.required]),
      cardRate: new FormControl(null, [Validators.required]),
      minimumPrice: new FormControl(null, [Validators.required]),
      footfallPerMonth: new FormControl(null, [Validators.required]),
      footfallPerDay: new FormControl(null, [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      landmark: new FormControl('', [Validators.required]),
      tags: new FormControl([], [Validators.required]),
      breakStartTime: new FormControl('', []),
      breakEndTime: new FormControl('', []),
      widthInPixels: ['', Validators.required],
      heightInPixels: ['', Validators.required],
      state: ['', Validators.required],
    });

    this.screenForm.valueChanges.subscribe(() => {
      this.updateSFT();
    });
  }

  ngOnInit() {
    this.loadSchedulers();
    this.loadCityNames();
    this.loadScreenCategories();
    this.loadScreenNetwork();
    this.loadState();
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

  coordinateValidator() {
    return (control: { value: string }) => {
      const value = control.value;
      if (!value || value.trim() === '') {
        return null;
      }
      const regex =
        /^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
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
      console.log('screen Form', this.screenForm);
      this.loaderService.showLoader();
      const formData = new FormData();
      formData.append('screenName', this.screenForm.value.screenName);
      formData.append('address', this.screenForm.value.address);
      formData.append(
        'width',
        this.screenForm.value.width
          ? this.screenForm.value.width.toString()
          : ''
      );
      formData.append(
        'height',
        this.screenForm.value.height
          ? this.screenForm.value.height.toString()
          : ''
      );
      formData.append(
        'SFT',
        this.screenForm.value.SFT ? this.screenForm.value.SFT.toString() : ''
      );
      formData.append('localIP', this.localIP);
      formData.append('MACID', this.MACID);
      formData.append('screenType', this.screenForm.value.screenType);
      formData.append(
        'screenSize',
        this.screenForm.value.screenSize
          ? this.screenForm.value.screenSize.toString()
          : ''
      );
      formData.append('pincode', this.screenForm.value.pincode);
      formData.append('lastHeartbeat', this.lastHeartbeat);
      formData.append('upTime', this.upTime);
      formData.append('inSyncStatus', this.inSyncStatus);
      formData.append('hardwareVersion', this.hardwareVersion);
      formData.append('softwareVersion', this.softwareVersion);
      formData.append(
        'locationCoordinates',
        this.screenForm.value.locationCoordinates
      );
      formData.append('screenStatus', this.screenForm.value.screenStatus);
      formData.append('rebootFlag', this.rebootFlag);
      formData.append('schedulerId', this.screenForm.value.schedulerId);

      formData.append('slotSize', this.slotSize ? this.slotSize : '');
      formData.append('cycleTime', this.cycleTime ? this.cycleTime : '');

      const nextAvailableDate = this.screenForm.value.nextAvailableDate;
      const formattedDate = this.datePipe.transform(
        nextAvailableDate,
        'dd/MM/yyyy'
      );
      formData.append('NextAvailableDate', formattedDate || '');
      formData.append('cityName', this.screenForm.value.cityName);
      formData.append('screenCategory', this.screenForm.value.screenCategory);
      formData.append('screenNetwork', this.screenForm.value.screenNetwork);
      formData.append('cardinalPoint', this.screenForm.value.cardinalPoint);
      formData.append('cardRate', this.screenForm.value.cardRate?.toString());
      formData.append(
        'minimumPrice',
        this.screenForm.value.minimumPrice?.toString()
      );
      formData.append(
        'footfallPerMonth',
        this.screenForm.value.footfallPerMonth?.toString()
      );
      formData.append(
        'footfallPerDay',
        this.screenForm.value.footfallPerDay?.toString()
      );
      formData.append('locality', this.screenForm.value.locality);
      formData.append('landmark', this.screenForm.value.landmark);
      formData.append('tags', JSON.stringify(this.screenForm.value.tags));

      formData.append('widthInPixels', this.screenForm.value.widthInPixels);
      formData.append('heightInPixels', this.screenForm.value.heightInPixels);
      formData.append('state', this.screenForm.value.state);
      // Calculate and append orientation
      const width = this.screenForm.value.width;
      const height = this.screenForm.value.height;
      if (width && height) {
        const parsedWidth = parseFloat(width);
        const parsedHeight = parseFloat(height);
        const orientation =
          parsedWidth > parsedHeight ? 'Horizontal' : 'Vertical';
        formData.append('orientation', orientation);
      }

      if (this.imageFiles && this.imageFiles.length > 0) {
        for (let i = 0; i < this.imageFiles.length; i++) {
          formData.append('imageFiles', this.imageFiles[i]);
        }
      }

      this.screenService.createScreen(formData).subscribe(
        (response) => {
          console.log('Screen created successfully:', response);
          this.notificationService.showNotification(
            'Screen created successfully',
            'success'
          );
          this.loaderService.hideLoader();
          this.router.navigate(['/screen']);
        },
        (error) => {
          console.error('Error creating screen:', error);
          this.notificationService.showNotification(
            'Screen is not created',
            'error'
          );
          this.loaderService.hideLoader();
        }
      );
    }
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
      const formattedDate = this.datePipe.transform(
        nextAvailableDate,
        'dd/MM/yyyy'
      );
      this.screenForm.patchValue({ nextAvailableDate: formattedDate });
    }
  }

  addTag(event: any): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.screenForm.get('tags')?.setValue(this.tags);
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.screenForm.get('tags')?.setValue(this.tags);
  }
}
