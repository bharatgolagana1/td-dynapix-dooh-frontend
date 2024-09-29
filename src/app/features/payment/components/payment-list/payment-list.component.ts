import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CampaignService } from 'src/app/features/campaign/campaign.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit{
  campaigns: any[] = [];
  displayedColumns: string[] = [
    'customerName',
    'startDate',
    'endDate',
    'noOfScreens',
    'totalAmount'
  ];
  pageIndex: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private campaignService: CampaignService,
    public loaderService: LoaderService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.loaderService.showLoader();
    this.campaignService.getCampaigns(this.pageIndex + 1, this.pageSize).subscribe(
      (response) => {
        this.campaigns = response.campaigns.filter((campaign: { isLiveApproved: any; }) => campaign.isLiveApproved);
        this.totalItems = this.campaigns.length;
        this.loaderService.hideLoader();
      },
      (error) => {
        console.error('Error loading campaigns:', error);
        this.loaderService.hideLoader();
      }
    );
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCampaigns();
  }

  onRowClick(campaign: any) {
    this.campaignService.getCampaignById(campaign._id).subscribe({
      next: (response) => {
        if (response.campaign) {
          this.router.navigate([`payment/${campaign._id}/paymentdetails`]);
        } else {
          this.notificationService.showNotification(
            'Campaign not found',
            'warning'
          );
        }
      },
      error: (error) => {
        console.error('Error fetching campaign:', error);
        this.notificationService.showNotification(
          'Error fetching campaign details',
          'error'
        );
      },
    });
  }
}
