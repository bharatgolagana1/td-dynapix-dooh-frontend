import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, NgZone, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from '../../booking.service';
import { debounceTime, Subject } from 'rxjs';
import { ImageDialogComponent } from 'src/app/features/screen/components/image-dialog/image-dialog.component';
import { DateRangeDialogComponent } from 'src/app/features/screen/components/date-range-dialog/date-range-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.scss']
})
export class EditBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  bookingForm: FormGroup;
  screens: Screen[] = [];
  imageFiles: File[] = [];
  isLoading: boolean = true;
  bookingId: string | null = null;
  media: any[] = [];

  private filterSubject = new Subject<any>();

  dateOptions: any[] = [];
  screenTypeOptions: any[] = [];
  statusOptions: any[] = [];
  categoryOption: any[] = [];
  slotSize: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookingForm = this.fb.group({
      customerName: new FormControl('', [Validators.required]),
      slotSize: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', [Validators.required]),
      categoryType: new FormControl('Internal', [Validators.required]),
      dateRange: this.fb.group({
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required])
      }),
      filters: this.fb.group({
        addressOrPincode: [''],
        screenType: ['Both'],
        size: ['All'],
        status: ['Both'],
        date: ['All Time']
      }),
      mediaContent: this.fb.array([]),
      screenIds: new FormControl([], [Validators.required])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bookingId = params.get('id');
      if (this.bookingId) {
        this.loadBookingDetails();
      }
    });

    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.loadScreens();
    });

    this.loadOptions();
    this.loadScreens();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loadBookingDetails(): void {
    this.bookingService.getBookingDetails(this.bookingId!).subscribe(
      (data: any) => {
        this.bookingForm.patchValue({
          customerName: data.customerName[0],
          slotSize: data.slotSize,
          totalAmount: data.totalAmount,
          categoryType: data.categoryType,
          dateRange: {
            startDate: data.startDate,
            endDate: data.endDate
          }
        });

        const screenIdsFormArray = this.bookingForm.get('screenIds') as FormArray;
        const selectedScreenIds = data.screenIds;
        this.bookingForm.get('screenIds')?.setValue(selectedScreenIds);

        this.imageFiles = [];
        const mediaArray = this.bookingForm.get('mediaContent') as FormArray;
        mediaArray.clear();

        data.media.forEach((media: { mediaURL: string }) => {
          const file = new File([], media.mediaURL); 
          this.imageFiles.push(file);
          mediaArray.push(new FormControl(media.mediaURL)); 
        });

        this.loadScreens();
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error loading booking details:', error);
      }
    );
  }

  loadOptions(): void {
    this.bookingService.getDateOptions().subscribe(data => {
      this.dateOptions = data;
    });
    this.bookingService.getScreenTypeOptions().subscribe(data => {
      this.screenTypeOptions = data;
    });
    this.bookingService.getStatusOptions().subscribe(data => {
      this.statusOptions = data;
    });
    this.bookingService.getCategoryOptions().subscribe(data => {
      this.categoryOption = data;
    });
    this.bookingService.getSlotSizeOptions().subscribe(data => {
      this.slotSize = data;
    });
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
    this.isLoading = true;
    this.bookingService.screensList(this.bookingForm.get('filters')?.value).subscribe(
      (data: { screens: Screen[] }) => {
        this.ngZone.run(() => {
          const selectedScreenIds = this.bookingForm.get('screenIds')?.value;
          this.screens = data.screens.map(screen => ({
            ...screen,
            selected: selectedScreenIds.includes(screen._id)
          }));
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
      (error: any) => {
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
      data: { images: imageUrls }
    });
  }

  onScreenSelectionChange(screen: Screen): void {
    screen.selected = !screen.selected;
    const selectedScreenIds = this.screens
      .filter(s => s.selected)
      .map(s => s._id)
      .filter(id => !!id);
    this.ngZone.run(() => {
      this.bookingForm.patchValue({
        screenIds: selectedScreenIds
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
    this.imageFiles.forEach(file => {
      mediaArray.push(new FormControl(URL.createObjectURL(file))); // Store the URL instead of the File object
    });
  }

  removeFile(index: number): void {
    this.ngZone.run(() => {
      this.imageFiles.splice(index, 1);
      this.updateMediaContent();
    });
  }

  onUpdateBooking(): void {
    if (this.bookingForm.invalid) {
      return;
    }

    const formValues = this.bookingForm.value;

    const formData = new FormData();
    formData.append('customerName', formValues.customerName);
    formData.append('slotSize', formValues.slotSize.toString());
    formData.append('totalAmount', formValues.totalAmount);
    formData.append('categoryType', formValues.categoryType);
    formData.append('startDate', formValues.dateRange.startDate);
    formData.append('endDate', formValues.dateRange.endDate);

    const mediaContentArray = formValues.mediaContent;
    mediaContentArray.forEach((mediaUrl: string) => {
      const file = this.imageFiles.find(file => URL.createObjectURL(file) === mediaUrl);
      if (file) {
        formData.append('mediaContent', file, file.name);
      }
    });

    const screenIds = formValues.screenIds;
    screenIds.forEach((id: string) => {
      formData.append('screenIds', id);
    });

    this.bookingService.updateBooking(this.bookingId!, formData).subscribe(
      (response: any) => {
        this.router.navigate(['/booking']);
      },
      (error: any) => {
        console.error('Error updating booking:', error);
      }
    );
  }
}
