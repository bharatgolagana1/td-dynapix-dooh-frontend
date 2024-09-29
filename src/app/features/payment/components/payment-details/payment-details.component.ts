import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from 'src/app/features/campaign/campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionConfirmDailogComponent } from '../transaction-confirm-dailog/transaction-confirm-dailog.component';
import { PaymentService } from '../../payment.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoaderService } from 'src/app/core/services/loader.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit{
  paymentForm!: FormGroup;
  campaignId!: string | null;
  existingTransactions: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['transactionId', 'transactionChannel', 'transactionDate','paidAmount', 'dueAmount'];
  isPaymentComplete: boolean = false;
  showUpdateTransactionSection: boolean = true; 
  isLoadingTransactions: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private paymentService: PaymentService,
    private dialog: MatDialog,
    public loaderService: LoaderService,
    private notificationService: NotificationService
    
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      customerName: [{ value: '', disabled: true }],
      dateRange: this.fb.group({
        startDate: [{ value: '', disabled: true }],
        endDate: [{ value: '', disabled: true }]
      }),
      totalAmount: [{ value: '', disabled: true }],
      noOfScreens: [{ value: '', disabled: true }],
      paidAmount: ['', [Validators.required]],
      dueAmount: [{ value: '', disabled: true }],
      transactionId: ['', [Validators.required]],
      transactionChannel: ['', [Validators.required]],
    });

    this.campaignId = this.route.snapshot.paramMap.get('campaignId');
    if (this.campaignId) {
      this.fetchCampaignDetails(this.campaignId);
      this.fetchTransactions(this.campaignId);
    }
  }

  fetchCampaignDetails(campaignId: string): void {
    this.campaignService.getCampaignById(campaignId).subscribe({
      next: (response) => {
        this.paymentForm.patchValue({
          customerName: response.campaign.customerName,
          dateRange: {
            startDate: response.campaign.startDate,
            endDate: response.campaign.endDate
          },
          totalAmount: response.campaign.totalAmount,
          noOfScreens: response.campaign.screenIds.length
        });
        this.loaderService.hideLoader();
      },
      error: (error) => {
        this.loaderService.hideLoader(); 
        this.notificationService.showNotification('Error fetching campaign details', 'error');
        console.error('Error fetching campaign:', error);
      }
    });
  }

  fetchTransactions(campaignId: string): void {
    this.isLoadingTransactions = true; 
    this.paymentService.getTransactionsByCampaignId(campaignId).subscribe({
      next: (response) => {
        if (response.payments && response.payments.length > 0) {
          this.existingTransactions = response.payments.flatMap((payment: { transactions: any }) => payment.transactions) || [];
          const totalPaidAmount = this.existingTransactions.reduce((acc, transaction) => acc + transaction.paidAmount, 0);
          const totalAmount = this.paymentForm.get('totalAmount')?.value || 0;
          const dueAmount = totalAmount - totalPaidAmount;
          this.paymentForm.get('dueAmount')?.setValue(dueAmount);
          this.checkForCompletePayment(dueAmount);
        } else {
          this.existingTransactions = [];
          const totalAmount = this.paymentForm.get('totalAmount')?.value || 0;
          this.paymentForm.get('dueAmount')?.setValue(totalAmount);
          this.isPaymentComplete = false;
        }
  
        this.dataSource.data = this.existingTransactions;
        if (this.existingTransactions.length > 0) {
          this.isLoadingTransactions = false;
        } else {
          setTimeout(() => {
            this.isLoadingTransactions = true;
          }, 2000);
        }
      },
      error: (error) => {
        setTimeout(() => {
          this.isLoadingTransactions = false;
          this.notificationService.showNotification('Error fetching transactions', 'error');
          console.error('Error fetching transactions:', error);
        }, 2000);
      }
    });
  }

  checkForCompletePayment(dueAmount: number): void {
    this.isPaymentComplete = dueAmount === 0;
  }
  

  calculateDueAmount(): void {
    const totalAmount = this.paymentForm.get('totalAmount')?.value || 0;
    const paidAmount = this.paymentForm.get('paidAmount')?.value || 0;

    let previousDueAmount = totalAmount;
    if (this.existingTransactions.length > 0) {
      const lastTransaction = this.existingTransactions[this.existingTransactions.length - 1];
      previousDueAmount = lastTransaction.dueAmount;
    }

    const newDueAmount = previousDueAmount - paidAmount;
    this.paymentForm.get('dueAmount')?.setValue(newDueAmount);
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.notificationService.showNotification('Form is invalid', 'error');
      return;
    }

    const dialogRef = this.dialog.open(TransactionConfirmDailogComponent, {
      data: { message: 'Do you want to confirm this transaction?' }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const paymentData = this.paymentForm.getRawValue();

        if (!this.campaignId) {
          this.notificationService.showNotification('Campaign ID not found', 'error');
          return;
        }

        const payload = {
          campaignId: this.campaignId,
          transactions: [{
            transactionId: paymentData.transactionId,
            transactionChannel: paymentData.transactionChannel,
            transactionDate: new Date(),
            paidAmount: paymentData.paidAmount,
            dueAmount: paymentData.dueAmount
          }]
        };

        this.loaderService.showLoader(); 

        this.paymentService.addTransaction(payload).subscribe({
          next: () => {
            this.notificationService.showNotification('Transaction added successfully', 'success');
            this.fetchTransactions(this.campaignId as string);
            this.showUpdateTransactionSection = false;
            this.checkForCompletePayment(paymentData.dueAmount);
            this.loaderService.hideLoader(); 
          },
          error: (error) => {
            this.loaderService.hideLoader(); 
            this.notificationService.showNotification('Error adding transaction', 'error');
            console.error('Error adding transaction:', error);
          }
        });
      }
    });
  }
}
