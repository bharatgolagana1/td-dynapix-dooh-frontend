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
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CampaignService } from '../../campaign.service';
import { debounceTime, Subject } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

export interface CategoryOption {
  categoryOption: string;
  status: boolean;
}

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
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss'],
})
export class CreateCampaignComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  campaignForm: FormGroup;
  screens: ScreenAvailability[] = [];
  private filterSubject = new Subject<any>();
  extraSlotSizes: any[] = [];
  customerNames: any[] = [];
  dateOptions: any[] = [];
  screenTypeOptions: any[] = [];
  statusOptions: any[] = [];
  categoryOption: CategoryOption[] = [];
  slotSize: any[] = [];
  orientationOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Horizontal', label: 'Horizontal' },
    { value: 'Vertical', label: 'Vertical' },
  ];

  selectedDates: { screenId: string; dates: Date[] }[] = [];

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private cdr: ChangeDetectorRef,
    public loaderService: LoaderService,
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService
  ) {
    this.campaignForm = this.fb.group({
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
      screenIds: new FormControl([], [Validators.required]),
      extraSlotSize: [''],
    });
  }

  ngOnInit() {
    this.loaderService.hideLoader();
    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      if (this.isFilterValid()) {
        this.loadScreens();
      }
    });
    this.loadOptions();
    this.loadCustomerNames();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loadCustomerNames(): void {
    this.campaignService.getCustomerNames().subscribe(
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
    this.campaignService.getDateOptions().subscribe((data) => {
      this.dateOptions = data;
    });
    this.campaignService.getScreenTypeOptions().subscribe((data) => {
      this.screenTypeOptions = data;
    });
    this.campaignService.getStatusOptions().subscribe((data) => {
      this.statusOptions = data;
    });
    this.campaignService.getCategoryOptions().subscribe((data) => {
      this.categoryOption = data;
    });
    this.campaignService.getSlotSizeOptions().subscribe((data) => {
      this.slotSize = data;
    });
    this.campaignService.getExtraSlotSize().subscribe((data) => {
      this.extraSlotSizes = data;
    });
  }

  onFilterChange() {
    const filters = this.campaignForm.get('filters')?.value;
    const dateRange = this.campaignForm.get('dateRange')?.value;
    filters.slotSize = this.campaignForm.get('slotSize')?.value;
    filters.startDate = dateRange.startDate;
    filters.endDate = dateRange.endDate;

    this.filterSubject.next(filters);
  }

  isFilterValid(): boolean {
    const filters = this.campaignForm.get('filters')?.value;
    const dateRange = this.campaignForm.get('dateRange')?.value;
    return filters.slotSize && dateRange.startDate && dateRange.endDate;
  }

  loadScreens() {
    this.loaderService.showLoader();
    this.campaignService
      .screensList(this.campaignForm.get('filters')?.value)
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
      this.campaignForm.patchValue({
        screenIds: selectedScreenIds,
      });
      this.cdr.detectChanges();
    });
  }

  onCreateCampaign() {
    if (this.campaignForm.invalid) {
      return;
    }
    this.loaderService.showLoader();
    const formValues = this.campaignForm.value;

    const formData = new FormData();
    formData.append('customerName', formValues.customerName);
    formData.append('slotSize', formValues.slotSize);
    formData.append('totalAmount', formValues.totalAmount);

    formData.append('categoryType', formValues.categoryType);

    formData.append('startDate', formValues.dateRange.startDate);
    formData.append('endDate', formValues.dateRange.endDate);

    if (formValues.extraSlotSize) {
      formData.append('extraSlotSize', formValues.extraSlotSize);
    }

    if (formValues.screenIds && formValues.screenIds.length > 0) {
      formValues.screenIds.forEach((screenId: string) => {
        formData.append('screenIds', screenId);
      });
    }

    this.campaignService.createCampaign(formData).subscribe(
      (response) => {
        console.log('Campaign created successfully:', response);
        this.loaderService.hideLoader();
        this.router.navigate([`/campaign`]);
      },
      (error) => {
        console.error('Error creating campaign:', error);
        this.loaderService.hideLoader();
      }
    );
  }
  resetForm(): void {
    this.campaignForm.reset({
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
      screenIds: [],
      extraSlotSize: '',
    });
    this.screens = [];
    this.selectedDates = [];

    // Optional: Only reload screens if needed
    // this.loadScreens();
  }
}
