import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../../campaign.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';
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

  constructor(
    private campaignService: CampaignService,
    private loaderService: LoaderService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.loaderService.showLoader();
    this.campaignService.getCampaigns().subscribe(
      (data) => {
        //@ts-ignore
        this.campaigns = data.campaigns;
        this.loaderService.hideLoader();
      },
      (error) => {
        console.error('Error loading campaigns:', error);
        this.loaderService.hideLoader();
      }
    );
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
