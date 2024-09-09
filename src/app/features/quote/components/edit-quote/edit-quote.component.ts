import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  AfterViewInit
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
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DateRangeDialogComponent } from 'src/app/features/screen/components/date-range-dialog/date-range-dialog.component';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.scss']
})
export class EditQuoteComponent implements OnInit, AfterViewInit {
  quoteForm!: FormGroup;
  customerNames: any[] = [];
  gstRate: number = 0.18;
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
  screenNetworks: any[] = [];
  screens: any[] = [];
  previewData: any[] = [];
  termsAndConditions: any[] = [];
  showPreview = false;
  quoteId!: string;
  filters = {
    addressOrPincode: '',
    screenType: 'Both',
    orientation: 'Both',
    status: 'Both',
    date: 'All Time',
    fromDate: null,
    toDate: null
  };
  allSelected: boolean = false;
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

  orientationOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Horizontal', label: 'Horizontal' },
    { value: 'Vertical', label: 'Vertical' }
  ];

  statusOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];
  quote: any;

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private cdr: ChangeDetectorRef,
    public loaderService: LoaderService,
    private dialog: MatDialog,
    private ngZone: NgZone,
    private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute
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
      creativeRequirement: new FormControl(this.creativeRequirement, [Validators.required]),
      quotedPrice: new FormControl('', [Validators.required]),
      GST: new FormControl(this.gstRate, [Validators.required]),
      grandTotal: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
          filters: this.fb.group({
        addressOrPincode: [''],
        screenType: ['Both'],
        orientation: ['Both'],
        status: ['Both'],
        date: ['All Time'],
      }),
    });
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.quoteId = params.get('quoteId') || '';
  
      if (this.quoteId) {
        this.loadQuoteDetails(this.quoteId);
      }
    });
  
    this.loaderService.hideLoader();
    this.loadCustomerNames();
    this.loadMediaIdentity();
    this.loadCityNames();
    this.loadScreenNetworks();

    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.loadScreens();
    });
  
    this.loadScreens();
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


  loadScreens(previewScreens: any[] = []): void {
    this.quoteService.getScreensList(this.filters).subscribe(
      (data: { screens: any[] }) => {
        const previewScreenIds = previewScreens.map(p => p.screenId);
        console.log("Fetched Screens:", data.screens);  
  
        this.screens = data.screens.map(screen => ({
          ...screen,
          selected: previewScreenIds.includes(screen._id),
          screenName: screen.screenName || 'Unnamed Screen',  
        }));
  
        console.log("Screens after mapping:", this.screens);  
      },
      error => {
        console.error('Error fetching screens:', error);
      }
    );
  }
  
  onFilterChange() {
    if (this.filters.date === 'Date Range') {
      this.openDateRangeDialog();
    } else {
      this.filterSubject.next(this.filters);
    }
  }
  openDateRangeDialog(): void {
    const dialogRef = this.dialog.open(DateRangeDialogComponent, {
      width: '300px',
      data: { fromDate: this.filters.fromDate, toDate: this.filters.toDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filters.fromDate = result.fromDate;
        this.filters.toDate = result.toDate;
        this.filterSubject.next(this.filters);
      } else {
        this.filters.date = 'All Time';
        this.filterSubject.next(this.filters);
      }
    });
  }
  loadQuoteDetails(quoteId: string): void {
    this.quoteService.getQuoteById(quoteId).subscribe({
      next: (quote) => {
        this.quote = quote;

        console.log('Loaded Quote Preview:', quote.preview);

        this.quoteForm.patchValue({
          customerName: quote.customerName,
          dateRange: {
            startDate: quote.startDate,
            endDate: quote.expiryDate,
          },
          city: quote.city,   
          mediaIdentity: quote.mediaIdentity,   
          network: quote.network,   
          creativeRequirement: quote.creativeRequirement,
          quotedPrice: quote.quotedPrice,
          GST: quote.GST,
          grandTotal: quote.grandTotal,
          status: quote.status,
        });
  
        this.loadScreens(quote.preview);
      },
      error: (error) => {
        console.error('Error fetching quote:', error);
        this.notificationService.showNotification('Error fetching quote details.');
      },
    });
  }
  
  updateScreenSelection(preview: any[]): void {
    if (!this.screens.length) {
      return;
    }
  
    const selectedScreenIds = new Set(preview.map(p => p.screenId));
  
    this.screens = this.screens.map(screen => ({
      ...screen,
      selected: selectedScreenIds.has(screen._id),
    }));
  }

  onScreenSelectionChange(screenId: string, isChecked: boolean): void {
    this.screens = this.screens.map(screen => 
      screen._id === screenId ? { ...screen, selected: isChecked } : screen
    );
    
    console.log('Updated Screens after selection:', this.screens);  
  
    const anySelected = this.screens.some(screen => screen.selected);
    
    if (anySelected) {
      this.showPreviewCard();
    } else {
      this.hidePreviewCard();
    }
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

  showPreviewCard() {
    this.showPreview = true;
    this.generatePreviewData();
    this.fetchTermsAndConditions();
  }

  hidePreviewCard() {
    this.showPreview = false;
    this.previewData = [];
  }
  getGrandTotal(): number {
    return this.previewData.reduce((sum, screen) => sum + screen.grandTotal, 0);
  }
  generatePreviewData() {
    console.log(this.screens);  
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
      .filter(screen => screen.selected)
      .map(screen => {
        console.log(screen.screenName);  
        const slotSize = screen.slotSize || 0;
        const cycleTime = screen.cycleTime || 0;
        const minimumPrice = screen.minimumPrice || 0;
        const footfallPerMonth = screen.footfallPerMonth || 'N/A';
        const noOfImpressions = slotSize + cycleTime * days;
        const quotedPrice = minimumPrice;
        const totalGst = quotedPrice * this.gstRate;
        const grandTotal = quotedPrice + totalGst;
  
        return {
          screenNames: screen.screenName ? [screen.screenName] : [], 
          typeOfMedia: screen.screenType || 'N/A',
          screenDimensions: screen.size || 'N/A',
          slotDuration: slotSize || 'N/A',
          screenIdentity: screen.screenName || 'N/A',
          loopTime: cycleTime || 'N/A',
          screenId: screen._id || 'N/A',
          noOfImpressions,
          avgFootFall: footfallPerMonth,
          noOfScreens: 1,
          quotedPrice,
          GST: totalGst,
          grandTotal,
          creativeRequirement: '1920 X 1080',
        };
      })        
  
    console.log('Preview Data:', this.previewData); 
  }
  updateQuote(): void {
    if (this.quoteForm.invalid) {
      this.notificationService.showNotification('Please fill all required fields.');
      return;
    }
  
    const selectedScreens = this.screens.filter(screen => screen.selected);

    this.generatePreviewData();
  
    const quoteData = {
      customerName: this.quoteForm.get('customerName')?.value || this.quote.customerName,
      startDate: this.quoteForm.get('dateRange.startDate')?.value || this.quote.startDate,
      expiryDate: this.quoteForm.get('dateRange.endDate')?.value || this.quote.expiryDate,
      city: this.quoteForm.get('city')?.value || this.quote.city,
      mediaIdentity: this.quoteForm.get('mediaIdentity')?.value || this.quote.mediaIdentity,
      network: this.quoteForm.get('network')?.value || this.quote.network,
      slotDuration: selectedScreens.length > 0
        ? selectedScreens.reduce(
            (sum, screen) => sum + parseFloat(screen.slotSize || 0),
            0
          ) / selectedScreens.length
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
      creativeRequirement: this.quoteForm.get('creativeRequirement')?.value || this.quote.creativeRequirement,
      status: this.quoteForm.get('status')?.value || this.quote.status,
      preview: this.previewData.map(screen => ({
        city: this.quoteForm.get('city')?.value || '',
        mediaIdentity: this.quoteForm.get('mediaIdentity')?.value || '',
        network: this.quoteForm.get('network')?.value || '',
        screenNames: screen.screenNames,
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
      }))
    };
  
    console.log('Updated Quote Data:', quoteData);
  
    this.quoteService.updateQuote(this.quoteId, quoteData).subscribe(
      (response) => {
        this.notificationService.showNotification('Quote updated successfully!');
        this.router.navigate(['/quote']);
      },
      (error) => {
        console.error('Error updating quote:', error);
        this.notificationService.showNotification('Failed to update quote.');
      }
    );
  }
  
  
  }
  

