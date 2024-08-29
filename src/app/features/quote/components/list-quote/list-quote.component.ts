import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../quote.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteQuoteComponent } from '../delete-quote/delete-quote.component';
@Component({
  selector: 'app-list-quote',
  templateUrl: './list-quote.component.html',
  styleUrls: ['./list-quote.component.scss']
})
export class ListQuoteComponent implements OnInit{
  termsAndConditions: any[] = [];
  quotes: any[] = [];
  isLoading: boolean = false;
  noQuoteFound: boolean = false;
  filters = {
    customerName: '',
    city: '',
    network: '',
    status: ''
  };
  statusOptions = [
    { value: 'Draft', label: 'Draft' },
    { value: 'Generated', label: 'Generated' },
    { value: 'Submitted', label: 'Submitted' },
  ];

  constructor(private quoteService: QuoteService, private loaderService: LoaderService,    private notificationService: NotificationService,
    public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.fetchTermsAndConditions();
    this.fetchQuotes();
  }

  onFilterChange(): void {
    this.fetchQuotes();
  }

  fetchQuotes(): void {
    this.isLoading = true;
    this.noQuoteFound = false;
    this.loaderService.showLoader();
    this.quoteService.getQuotes(this.filters).subscribe(
      (data) => {
        if (data.length === 0) {
          this.noQuoteFound = true;
        } else {
          this.quotes = data;
          this.noQuoteFound = false;
        }
        this.isLoading = false;
        this.loaderService.hideLoader();
      },
      (error) => {
        console.error('Error fetching quotes:', error);
        this.isLoading = false;
        this.noQuoteFound = true;
        this.loaderService.hideLoader();  
        this.notificationService.showNotification('Error fetching quotes. Please try again.', 'error');
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

  deleteQuote(quoteId: string): void {
    const dialogRef = this.dialog.open(DeleteQuoteComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.showLoader();
        this.quoteService.deleteQuote(quoteId).subscribe(
          () => {
            this.notificationService.showNotification('Quote deleted successfully!', 'success');
            this.fetchQuotes(); 
          },
          (error) => {
            console.error('Error deleting quote:', error);
            this.notificationService.showNotification('Failed to delete quote. Please try again.', 'error');
          }
        );
      }
    });
  }
  
}
