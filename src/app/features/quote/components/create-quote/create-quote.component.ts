import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuoteService } from '../../quote.service';
import { debounceTime, Subject } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
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
  slotSize: number;
  cycleTime: number;
  footfallPerMonth: number;
  size: string;
  minimumPrice: number;
}

export interface ScreenAvailability {
  screen: Screen;
  availability: { date: Date; availableSlots: number }[];
  selected?: boolean;
}

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.scss'],
})
export class CreateQuoteComponent implements OnInit, AfterViewInit {
  quoteForm!: FormGroup;
  userData: any;
  firstName: string = '';
  lastName: string = '';
  role: string = '';
  customerNames: any[] = [];
  screens: ScreenAvailability[] = [];
  termsAndConditions: any[] = [];
  screenTypeOptions: any[] = [];
  statusOptions: any[] = [];
  previewData: any[] = [];
  gstRate: number = 0.18;
  private filterSubject = new Subject<any>();
  cityNames: any[] = [];
  creativeRequirement: string = '1920 X 1080';
  statusOptionsList: string[] = [
    'Generated',
    'Approved',
    'Submitted',
    'Closed',
    'On Hold',
  ];
  mediaIdentities: any[] = [];
  screenNetworks:any[] = [];
  selectedDates: { screenId: string; dates: Date[] }[] = [];
  showPreview = false;
  isScreenLoaderActive= false;

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private cdr: ChangeDetectorRef,
    public loaderService: LoaderService,
    private ngZone: NgZone,
    private router: Router,
    private notificationService: NotificationService,
    private keycloakOperationService: KeycloakOperationService
  ) {
    this.quoteForm = this.fb.group({
      customerName: new FormControl('', [Validators.required]),
      dateRange: this.fb.group({
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
      }),
      city: new FormControl('', [Validators.required]),
      mediaIdentity: new FormControl('', [Validators.required]),
      network: new FormControl('', [Validators.required]),
      filters: this.fb.group({
        addressOrPincode: [''],
        screenType: ['Both'],
        orientation: ['Both'],
        status: ['Both'],
        date: ['All Time'],
      }),
      creativeRequirement: new FormControl(this.creativeRequirement, [
        Validators.required,
      ]),
    });
  }
  
  downloadPDF() {
    const element = document.getElementById('quote-content'); 

    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 208; 
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let position = 10;

     
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth - 20, imgHeight);
      
      pdf.save('quote-content.pdf'); 
    });
  }

  ngOnInit() {
    this.loaderService.hideLoader();
    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.loadScreens();
    });
    this.loadOptions();
    this.loadCustomerNames();
    this.fetchUserData();
    this.loadMediaIdentity();
    this.loadCityNames();
    this.loadScreenNetworks();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loadCustomerNames(): void {
    this.quoteService.getCustomerNames().subscribe(
      (data: { customerNames: any[] }) => {
        this.customerNames = data.customerNames;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching customer names:', error);
      }
    );
  }

  loadMediaIdentity(): void {
    this.quoteService.getMediaIdentity().subscribe(
      (data: { mediaIdentities: any[] }) => {
        this.mediaIdentities = data.mediaIdentities;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching media identities:', error);
      }
    );
  }

  loadCityNames(): void {
    this.quoteService.getCityNames().subscribe(
      (data: { cityNames: any[] }) => {
        this.cityNames = data.cityNames;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching city names:', error);
      }
    );
  }


  loadScreenNetworks(): void {
    this.quoteService.getScreenNetworks().subscribe(
      (data: { screenNetworks: any[] }) => {
        this.screenNetworks = data.screenNetworks;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching screen networks:', error);
      }
    );
  }

  fetchTermsAndConditions(): void {
    this.quoteService.getTermsAndConditions().subscribe(
      (response) => {
        this.termsAndConditions = response;
      },
      (error) => {
        console.error('Error fetching terms and conditions:', error);
      }
    );
  }
  
  loadOptions(): void {
    this.quoteService.getScreenTypeOptions().subscribe((data) => {
      this.screenTypeOptions = data;
    });
    this.quoteService.getStatusOptions().subscribe((data) => {
      this.statusOptions = data;
    });
  }

  fetchUserData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.keycloakOperationService.getUserData().subscribe(
        (data) => {
          if (data && data.userId && data.email && data.organizationId) {
            this.userData = {
              userId: data.userId,
              userEmail: data.email,
              organizationId: data.organizationId,
            };
            console.log('User data fetched and set:', this.userData);
            resolve();
          } else {
            console.error('Incomplete user data received:', data);
            reject(new Error('Incomplete user data received'));
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching user data:', error);
          reject(error);
        }
      );
    });
  }

  onFilterChange() {
    const filters = this.quoteForm.get('filters')?.value;
    const dateRange = this.quoteForm.get('dateRange')?.value;

    if (dateRange.startDate && dateRange.endDate) {
      filters.startDate = dateRange.startDate;
      filters.endDate = dateRange.endDate;

      this.filterSubject.next(filters);
    } else {
      this.screens = [];
    }
  }

  loadScreens() {
    this.isScreenLoaderActive = true; 
    this.quoteService.screensList(this.quoteForm.get('filters')?.value).subscribe(
      (data: { screens: ScreenAvailability[] }) => {
        this.ngZone.run(() => {
          this.screens = (data.screens || []).map((screen) => ({
            ...screen,
            selected: false,
          }));
          this.isScreenLoaderActive = false; 
          this.cdr.detectChanges();
        });
      },
      (error) => {
        console.error('Error fetching screens:', error);
        this.ngZone.run(() => {
          this.isScreenLoaderActive = false;
          this.cdr.detectChanges();
        });
      }
    );
  }

  isFullyAvailable(
    availability: { date: Date; availableSlots: number }[]
  ): boolean {
    return availability.every((a) => a.availableSlots > 0);
  }

  showPreviewCard() {
    this.showPreview = true;
    this.generatePreviewData();
    this.fetchTermsAndConditions();
  }

  hidePreviewCard() {
    this.showPreview = false;
    this.previewData = [];
  }

  onScreenSelectionChange(screen: ScreenAvailability) {
    screen.selected = !screen.selected;
    const anySelected = this.screens.some((s) => s.selected);
    if (anySelected) {
      this.showPreviewCard();
    } else {
      this.hidePreviewCard();
    }
  }
  
  getGrandTotal(): number {
    return this.previewData.reduce((sum, screen) => sum + screen.grandTotal, 0);
  }
  generatePreviewData() {
    const dateRange = this.quoteForm.get('dateRange')?.value;

    if (!dateRange || !dateRange.startDate || !dateRange.endDate) {
      console.warn('Invalid date range');
      return;
    }

    const days =
      (new Date(dateRange.endDate).getTime() -
        new Date(dateRange.startDate).getTime()) /
        (1000 * 3600 * 24) +
      1;

    this.previewData = this.screens
      .filter((screen) => screen.selected)
      .map((screen) => {
        const noOfImpressions =
          screen.screen.slotSize + screen.screen.cycleTime * days;
        const quotedPrice = screen.screen.minimumPrice;
        const totalGst = quotedPrice * this.gstRate;
        const grandTotal = quotedPrice + totalGst;

        return {
          screenName: screen.screen.screenName,
          typeOfMedia: screen.screen.screenType,
          screenDimensions: screen.screen.size,
          slotDuration: screen.screen.slotSize,
          screenIdentity: screen.screen.screenName,
          loopTime: screen.screen.cycleTime,
          screenId: screen.screen._id,
          noOfImpressions,
          avgFootFall: screen.screen.footfallPerMonth,
          noOfScreens: 1,
          quotedPrice,
          GST: totalGst,
          grandTotal,
          creativeRequirement: '1920 X 1080',
        };
      });
  }

  submitQuote(status: string) {
    console.log('submitQuote called with status:', status);

    this.loaderService.showLoader();

    if (this.quoteForm.invalid) {
        console.warn('Form is invalid. Please correct the errors.');
        this.quoteForm.markAllAsTouched();

        this.loaderService.hideLoader();
        return;
    }

    const quoteData = {
        customerName: this.quoteForm.get('customerName')?.value,
        city: this.quoteForm.get('city')?.value || '',
        mediaIdentity: this.quoteForm.get('mediaIdentity')?.value,
        network: this.quoteForm.get('network')?.value || '',
        filters: this.quoteForm.get('filters')?.value,
        dateRange: this.quoteForm.get('dateRange')?.value,
        startDate: this.quoteForm.get('dateRange')?.value.startDate,
        expiryDate: this.quoteForm.get('dateRange')?.value.endDate,
        creativeRequirement: this.quoteForm.get('creativeRequirement')?.value,
        slotDuration:
            this.previewData.length > 0
                ? this.previewData.reduce(
                    (sum, screen) => sum + parseFloat(screen.slotDuration),
                    0
                ) / this.previewData.length
                : 0,
        quotedPrice: this.previewData.reduce(
            (sum, screen) => sum + screen.quotedPrice,
            0
        ),
        GST: this.previewData.reduce((sum, screen) => sum + screen.GST, 0),
        grandTotal: this.previewData.reduce(
            (sum, screen) => sum + screen.grandTotal,
            0
        ),
        preview: this.previewData.map((screen) => ({
            city: this.quoteForm.get('city')?.value || '',
            mediaIdentity: this.quoteForm.get('mediaIdentity')?.value || '',
            network: this.quoteForm.get('network')?.value || '',
            screenNames: screen.screenName,
            screenId: screen.screenId,
            typeOfMedia: screen.typeOfMedia,
            screenDimensions: screen.screenDimensions,
            noOfScreens: screen.noOfScreens,
            slotDuration: screen.slotDuration.toString(),
            loopTime: screen.loopTime,
            noOfImpressions: screen.noOfImpressions,
            avgFootFall: screen.avgFootFall,
            quotedPrice: screen.quotedPrice,
            GST: screen.GST,
            total: screen.grandTotal,
        })),
        organizationId: this.userData?.organizationId || '',
        userEmail: this.userData?.email || '',
        status: status,
    };

    console.log('Quote Data before sending:', quoteData);

    this.quoteService.createQuote(quoteData).subscribe(
        (response) => {
            console.log('Quote created successfully:', response);
            this.notificationService.showNotification(
                'Screen created successfully',
                'success'
            );
            this.loaderService.hideLoader();
            this.router.navigate(['/quote']);
        },
        (error) => {
            console.error('Error creating quote:', error);

            this.loaderService.hideLoader();
        }
    );
  }


  isSubmitDisabled(): boolean {
    return this.quoteForm.invalid || !this.screens.some(screen => screen.selected);
  }

  
}
