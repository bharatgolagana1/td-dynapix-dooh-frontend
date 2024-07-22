import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  NgZone,
  AfterViewInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from '../../booking.service';
import { debounceTime, Subject } from 'rxjs';
import { ImageDialogComponent } from 'src/app/features/screen/components/image-dialog/image-dialog.component';
import { DateRangeDialogComponent } from 'src/app/features/screen/components/date-range-dialog/date-range-dialog.component';

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
})
export class CreateBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  bookingForm: FormGroup;
  screens: Screen[] = [];
  imageFiles: File[] = [];
  isLoading: boolean = true;

  private filterSubject = new Subject<any>();

  dateOptions = [
    { value: 'All Time', label: 'All Time' },
    { value: 'Today', label: 'Today' },
    { value: 'Yesterday', label: 'Yesterday' },
    { value: 'This Month', label: 'This Month' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'This Year', label: 'This Year' },
    { value: 'Date Range', label: 'Date Range' },
  ];

  screenTypeOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Tvs', label: 'Tvs' },
    { value: 'Billboard', label: 'Billboard' },
  ];

  statusOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  categoryOption = [
    { value: 'Internal', label: 'Internal' },
    { value: 'External', label: 'External' },
  ];

  slotSize = [
    { label: '5 sec', value: 5 },
    { label: '10 sec', value: 10 },
    { label: '15 sec', value: 15 },
    { label: '20 sec', value: 20 },
    { label: '25 sec', value: 25 },
    { label: '30 sec', value: 30 },
    { label: '35 sec', value: 35 },
    { label: '40 sec', value: 40 },
    { label: '45 sec', value: 45 },
    { label: '50 sec', value: 50 },
    { label: '55 sec', value: 55 },
    { label: '60 sec', value: 60 },
  ];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.bookingForm = this.fb.group({
      customerName: new FormControl('', [Validators.required]),
      slotSize: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', [Validators.required]),
      categoryType:new FormControl ('Internal', [Validators.required]),
      dateRange: this.fb.group({
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
      }),
      filters: this.fb.group({
        addressOrPincode: [''],
        screenType: ['Both'],
        size: ['All'],
        status: ['Both'],
        date: ['All Time'],
      }),
      mediaContent: this.fb.array([]),
      screenIds: [[]],
    });
  }

  ngOnInit() {
    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.loadScreens();
    });
    this.loadScreens();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
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
        toDate: this.bookingForm.get('filters')?.get('toDate')?.value,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookingForm.get('filters')?.patchValue({
          fromDate: result.fromDate,
          toDate: result.toDate,
        });
        this.filterSubject.next(this.bookingForm.get('filters')?.value);
      } else {
        this.bookingForm.get('filters')?.patchValue({ date: 'All Time' });
        this.filterSubject.next(this.bookingForm.get('filters')?.value);
      }
    });
  }

  loadScreens() {
    this.bookingService
      .screensList(this.bookingForm.get('filters')?.value)
      .subscribe(
        (data: { screens: Screen[] }) => {
          this.ngZone.run(() => {
            this.screens = data.screens.map((screen) => ({
              ...screen,
              selected: false,
            }));
            this.isLoading = false;
            this.cdr.detectChanges(); 
          });
        },
        (error) => {
          console.error('Error fetching screens:', error);
          this.ngZone.run(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          });
        }
      );
  }

  openDialog(imageUrls: string[]) {
    this.dialog.open(ImageDialogComponent, {
      data: { images: imageUrls },
    });
  }

  onScreenSelectionChange(screen: Screen): void {
    screen.selected = !screen.selected;
    const selectedScreenIds = this.screens
      .filter((s) => s.selected)
      .map((s) => s._id)
      .filter((id) => !!id);
      console.log('Selected Screen IDs:', selectedScreenIds);
    this.ngZone.run(() => {
      this.bookingForm.patchValue({
        screenIds: selectedScreenIds,
      });
      this.cdr.detectChanges();
    });
  }

  openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileSelected(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.ngZone.run(() => {
      this.imageFiles.push(...files);
      this.updateMediaContent();
    });
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files || []);
    this.ngZone.run(() => {
      this.imageFiles.push(...files);
      this.updateMediaContent();
    });
  }

  updateMediaContent(): void {
    const mediaArray = this.bookingForm.get('mediaContent') as FormArray;
    mediaArray.clear();
    this.imageFiles.forEach((file) => {
      mediaArray.push(new FormControl(file));
    });
  }

  removeFile(index: number): void {
    this.ngZone.run(() => {
      this.imageFiles.splice(index, 1);
      this.updateMediaContent();
    });
  }

  onCreateBooking(): void {
    if (this.bookingForm.invalid) {
      return;
    }
  
    const formValues = this.bookingForm.value;
    console.log('Form Values:', formValues); 
  
    const formData = new FormData();
    formData.append('customerName', formValues.customerName);
    formData.append('slotSize', formValues.slotSize.toString());
    formData.append('totalAmount', formValues.totalAmount.toString());
    formData.append('categoryType', formValues.categoryType);
    formData.append('startDate', formValues.dateRange.startDate);
    formData.append('endDate', formValues.dateRange.endDate);
  
    formValues.screenIds.forEach((screenId: string) => {
      formData.append('screenIds', screenId);
    });
  
    formValues.mediaContent.forEach((file: File) => {
      formData.append('mediaContent', file, file.name);
    });
  
    this.bookingService.createBooking(formData).subscribe(
      (response) => {
        console.log('Booking created successfully', response);
        this.resetForm(); 
      },
      (error) => {
        console.error('Error creating booking:', error);
      }
    );
  }
  
  resetForm(): void {
    this.bookingForm.reset({
      customerName: '',
      slotSize: '',
      totalAmount: '',
      categoryType: 'Internal',
      dateRange: {
        startDate: '',
        endDate: '',
      },
      filters: {
        addressOrPincode: '',
        screenType: 'Both',
        size: 'All',
        status: 'Both',
        date: 'All Time',
      },
      mediaContent: [],
      screenIds: [],
    });
    this.imageFiles = [];
    this.screens = [];
    this.isLoading = true;
    this.loadScreens();
  }
  
  
  
}
