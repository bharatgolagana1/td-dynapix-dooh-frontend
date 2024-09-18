import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CampaignService } from '../../campaign.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent implements OnInit {
  campaigns: any[] = [];
  displayedColumns: string[] = [
    'customerName',
    'startDate',
    'endDate',
    'noOfScreens',
    'actions',
  ];
  pageIndex: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private campaignService: CampaignService,
    private loaderService: LoaderService,
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
        this.campaigns = response.campaigns;
        this.totalItems = response.totalItems;
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

  onUploadMedia(campaignId: string) {
    this.campaignService.getCampaignById(campaignId).subscribe({
      next: (response) => {
        if (response.campaign) {
          this.router.navigate([`/campaign/${campaignId}/uploadmedia`]);
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
