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
import { LoaderService } from 'src/app/core/services/loader.service';
import { Router } from '@angular/router';
import { PartialAvailabilityDialogComponent } from '../partial-availability-dialog/partial-availability-dialog.component';

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
  Guuid?: string | null;
}


export interface ScreenAvailability {
  screen: Screen;
  availability: { date: Date; availableSlots: number }[];
  selected?: boolean;
}

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  bookingForm: FormGroup;
  screens: ScreenAvailability[] = [];
  imageFiles: File[] = [];
  customerNames: any[] = [];
  private filterSubject = new Subject<any>();
  extraSlotSizes :  any[] = [];
  dateOptions: any[] = [];
  screenTypeOptions: any[] = [];
  statusOptions: any[] = [];
  categoryOption: any[] = [];
  slotSize: any[] = [];
  orientationOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Horizontal', label: 'Horizontal' },
    { value: 'Vertical', label: 'Vertical' },
  ];

  selectedDates: { screenId: string; dates: Date[] }[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef,
    public loaderService: LoaderService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      customerName: new FormControl('', [Validators.required]),
      slotSize: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', [Validators.required]),
      categoryType: new FormControl('Internal', [Validators.required]),
      dateRange: this.fb.group({
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
      }),
      filters: this.fb.group({
        addressOrPincode: [''],
        screenType: ['Both'],
        orientation: ['Both'],
        status: ['Both'],
        date: ['All Time'],
      }),
      mediaContent: this.fb.array([]),
      screenIds: new FormControl([], [Validators.required]),
      extraSlotSize: [''],
    });
  }

  ngOnInit() {
    this.loaderService.hideLoader();
    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.loadScreens();
    });
    this.loadScreens();
    this.loadOptions();
    this.loadCustomerNames();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loadCustomerNames(): void {
    this.bookingService.getCustomerNames().subscribe(
      (data: { customerNames: any[] }) => {
        this.customerNames = data.customerNames;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching customer names:', error);
      }
    );
  }

  loadOptions(): void {
    this.bookingService.getDateOptions().subscribe((data) => {
      this.dateOptions = data;
    });
    this.bookingService.getScreenTypeOptions().subscribe((data) => {
      this.screenTypeOptions = data;
    });
    this.bookingService.getStatusOptions().subscribe((data) => {
      this.statusOptions = data;
    });
    this.bookingService.getCategoryOptions().subscribe((data) => {
      this.categoryOption = data;
    });
    this.bookingService.getSlotSizeOptions().subscribe((data) => {
      this.slotSize = data;
    });
    this.bookingService.getExtraSlotSize().subscribe((data) => {
      this.extraSlotSizes = data;
    });
  }

  onFilterChange() {
    const filters = this.bookingForm.get('filters')?.value;
    const dateRange = this.bookingForm.get('dateRange')?.value;
    filters.slotSize = this.bookingForm.get('slotSize')?.value;
    filters.startDate = dateRange.startDate;
    filters.endDate = dateRange.endDate;

    this.filterSubject.next(filters);
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
    this.loaderService.showLoader();
    this.bookingService
      .screensList(this.bookingForm.get('filters')?.value)
      .subscribe(
        (data: { screens: ScreenAvailability[] }) => {
          this.ngZone.run(() => {
            this.screens = data.screens.map((screen) => ({
              ...screen,
              selected: false,
            }));
            this.cdr.detectChanges();
            this.loaderService.hideLoader();
          });
        },
        (error) => {
          console.error('Error fetching screens:', error);
          this.ngZone.run(() => {
            this.cdr.detectChanges();
            this.loaderService.hideLoader();
          });
        }
      );
  }

  openDialog(imageUrls: string[]) {
    this.dialog.open(ImageDialogComponent, {
      data: { images: imageUrls },
    });
  }

  isFullyAvailable(
    availability: { date: Date; availableSlots: number }[]
  ): boolean {
    return availability.every((a) => a.availableSlots > 0);
  }
  onScreenSelectionChange(screenAvailability: ScreenAvailability): void {
    screenAvailability.selected = !screenAvailability.selected;
    const selectedScreenIds = this.screens
      .filter((s) => s.selected)
      .map((s) => s.screen._id)
      .filter((id) => !!id);
    this.ngZone.run(() => {
      this.bookingForm.patchValue({
        screenIds: selectedScreenIds,
      });
      this.cdr.detectChanges();
    });
  }

  openPartialAvailabilityDialog(
    screen: Screen,
    availability: { date: Date; availableSlots: number }[]
  ): void {
    const dialogRef = this.dialog.open(PartialAvailabilityDialogComponent, {
      width: '300px',
      data: { availability },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.selectedDates) {
        this.selectedDates.push({
          screenId: screen._id,
          dates: result.selectedDates,
        });
      }
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
    this.loaderService.showLoader();
    const formValues = this.bookingForm.value;
    console.log('Form Values:', formValues);
    const formData = new FormData();
    formData.append('customerName', formValues.customerName);
    formData.append('slotSize', formValues.slotSize.toString());
    formData.append('totalAmount', formValues.totalAmount.toString());
    formData.append('categoryType', formValues.categoryType);
    formData.append('startDate', formValues.dateRange.startDate);
    formData.append('endDate', formValues.dateRange.endDate);
    formData.append('extraSlotSize', formValues.extraSlotSize.toString());
    formValues.screenIds.forEach((screenId: string) => {
      formData.append('screenIds', screenId);
    });

    this.imageFiles.forEach((file, index) => {
      formData.append('mediaContent', file, file.name);
    });

    this.bookingService.createBooking(formData).subscribe(
      (response) => {
        console.log('Booking created successfully:', response);
        this.loaderService.hideLoader();
        this.router.navigate(['/booking']);
      },
      (error) => {
        console.error('Error creating booking:', error);
        this.loaderService.hideLoader();
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
      extraSlotSize :'',
    });
    this.imageFiles = [];
    this.screens = [];
    this.selectedDates = [];
    
    this.loadScreens();
  }
}
