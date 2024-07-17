import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { BookingService } from '../../booking.service';
import { debounceTime, Subject } from 'rxjs';
import { ImageDialogComponent } from 'src/app/features/screen/components/image-dialog/image-dialog.component';
import { DateRangeDialogComponent } from 'src/app/features/screen/components/date-range-dialog/date-range-dialog.component';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface Screen {
  id: any;
  _id: string;
  screenName: string;
  screenType: string;
  screenSize: string;
  SFT: string;
  NextAvailableDate: Date;
  address: string;
  locationCoordinates: string;
  screenStatus: string;
  createdAt: Date;
  imageUrls: string[];
  selected?: boolean;
  Guuid?: string | null;
}

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreateBookingComponent implements OnInit {
  bookingForm: FormGroup;
  screens: Screen[] = [];
  mediaContent: string[] = [];
  isLoading: boolean = true;

  private filterSubject = new Subject<any>();

  dateOptions = [
    { value: 'All Time', label: 'All Time' },
    { value: 'Today', label: 'Today' },
    { value: 'Yesterday', label: 'Yesterday' },
    { value: 'This Month', label: 'This Month' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'This Year', label: 'This Year' },
    { value: 'Date Range', label: 'Date Range' }
  ];

  screenTypeOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Tvs', label: 'Tvs' },
    { value: 'Billboard', label: 'Billboard' }
  ];

  statusOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private dialog: MatDialog,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.fb.group({
      customerName: ['', Validators.required],
      slotSize: ['', Validators.required],
      totalAmount: ['', Validators.required],
      mediaContent: ['', Validators.required],
      dateRange: this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }),
      categoryType: ['', Validators.required],
      screenIds: ['', Validators.required],
      filters: this.fb.group({
        addressOrPincode: [''],
        screenType: ['Both'],
        size: ['All'],
        status: ['Both'],
        date: ['All Time'],
        fromDate: null,
        toDate: null
      })
    });
  }

  ngOnInit() {
    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.loadScreens();
    });
    this.loadScreens();
  }

  onFilterChange() {
    if (this.bookingForm.get('filters')?.get('date')?.value === 'Date Range') {
      this.openDateRangeDialog();
    } else {
      this.filterSubject.next(this.bookingForm.get('filters')?.value);
    }
  }

  openDateRangeDialog(): void {
    const dialogRef = this.dialog.open(DateRangeDialogComponent, {
      width: '300px',
      data: {
        fromDate: this.bookingForm.get('filters')?.get('fromDate')?.value,
        toDate: this.bookingForm.get('filters')?.get('toDate')?.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingForm.get('filters')?.patchValue({
          fromDate: result.fromDate,
          toDate: result.toDate
        });
        this.filterSubject.next(this.bookingForm.get('filters')?.value);
      } else {
        this.bookingForm.get('filters')?.patchValue({ date: 'All Time' });
        this.filterSubject.next(this.bookingForm.get('filters')?.value);
      }
    });
  }

  loadScreens() {
    this.bookingService.screensList(this.bookingForm.get('filters')?.value).subscribe(
      (data: { screens: Screen[] }) => {
        this.screens = data.screens.map(screen => ({ ...screen, selected: false }));
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching screens:', error);
        this.isLoading = true;
      }
    );
  }

  openDialog(imageUrls: string[]) {
    this.dialog.open(ImageDialogComponent, {
      data: { images: imageUrls }
    });
  }

  onCreateBooking(): void {
    if (this.bookingForm.invalid) {
      console.log('Form is invalid');
      this.logFormErrors();
      return;
    }
  
    const formData = this.bookingForm.value;
    const startDate = moment(formData.dateRange.startDate).toISOString();
    const endDate = moment(formData.dateRange.endDate).toISOString();
  
    // Ensure screenIds are properly mapped
    const screenIds = this.screens.filter(screen => screen.selected).map(screen => screen._id);
  
    const bookingData = {
      customerName: formData.customerName,
      slotSize: formData.slotSize,
      totalAmount: formData.totalAmount,
      mediaContent: this.mediaContent,
      startDate,
      endDate,
      screenIds,
      categoryType: formData.categoryType,
      filters: {
        addressOrPincode: formData.filters.addressOrPincode,
        screenType: formData.filters.screenType,
        size: formData.filters.size,
        status: formData.filters.status,
        date: formData.filters.date,
        fromDate: moment(formData.filters.fromDate).toISOString(),
        toDate: moment(formData.filters.toDate).toISOString()
      }
    };
  
    console.log('Submitting booking data:', bookingData);
  
    if (!bookingData.screenIds.length) {
      console.error('No screens selected');
      return;
    }
  
    this.bookingService.createBooking(bookingData).subscribe(
      response => {
        console.log('Booking created successfully:', response);
      },
      error => {
        console.error('Error creating booking:', error);
      }
    );
  }
  
  
  
  logFormErrors() {
    Object.keys(this.bookingForm.controls).forEach(key => {
      const controlErrors = this.bookingForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log(`Key: ${key}, Errors: `, controlErrors);
      }
    });
  
    const dateRangeErrors = this.bookingForm.get('dateRange')?.errors;
    if (dateRangeErrors != null) {
      console.log(`Key: dateRange, Errors: `, dateRangeErrors);
    }
  
    const filtersErrors = this.bookingForm.get('filters')?.errors;
    if (filtersErrors != null) {
      console.log(`Key: filters, Errors: `, filtersErrors);
    }
  }
  
  onMediaUploadSuccess(mediaUrls: string[]): void {
    this.mediaContent = mediaUrls;
    this.bookingForm.get('mediaContent')?.setValue(mediaUrls);
  }

  onScreensSelected(selectedScreens: any[]): void {
    const screenIds = selectedScreens.map(screen => screen.id);
    this.bookingForm.get('screenIds')?.setValue(screenIds);
  }

  onScreenSelectionChange(screen: any): void {
    screen.selected = !screen.selected;
    const selectedScreens = this.screens.filter(s => s.selected);
    this.bookingForm.get('screenIds')?.setValue(selectedScreens.map(s => s._id));
  }
  
}
