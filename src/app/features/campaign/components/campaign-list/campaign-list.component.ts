import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../../campaign.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent implements OnInit {
  campaigns: any[] = [];
  displayedColumns: string[] = [
    'campaignName',
    'customerName',
    'startDate',
    'endDate',
    'actions',
  ];

  constructor(
    private campaignService: CampaignService,
    private loaderService: LoaderService,
    private router: Router
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
    this.router.navigate([`/campaign/${campaignId}/uploadmedia`]);
  }
}
