import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CampaignService } from '../../campaign.service';

@Component({
  selector: 'app-campaign-upload-media',
  templateUrl: './campaign-upload-media.component.html',
  styleUrls: ['./campaign-upload-media.component.scss'],
})
export class CampaignUploadMediaComponent {
  campaignId: string;
  selectedFiles: File[] = [];
  screenIds: string[] = [];
  screens: any[] = [];
  selectedScreens: any[] = [];
  isAllSelected: boolean = false;
  displayedColumns: string[] = ['screens', 'dateRange', 'media'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private loaderService: LoaderService
  ) {
    this.campaignId = this.route.snapshot.paramMap.get('campaignId')!;
  }


  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onCancel(): void {
    this.router.navigate(['/campaigns']);
  }

  onUpload(): void {
    if (this.selectedFiles.length > 0) {
      this.loaderService.showLoader();
      const formData = new FormData();
      formData.append('campaignId', this.campaignId);
      this.selectedFiles.forEach(file => formData.append('mediaFiles', file));

      this.campaignService.uploadMedia(formData).subscribe(
        () => {
          this.loaderService.hideLoader();
          this.router.navigate(['/campaigns']);
        },
        (error) => {
          console.error('Error uploading media:', error);
          this.loaderService.hideLoader();
        }
      );
    }
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const campaignId = params['campaignId'];
      this.fetchCampaignDetails(campaignId);
    });
  }

  fetchCampaignDetails(campaignId: string) {
    this.campaignService.getCampaignById(campaignId).subscribe({
      next: (response) => {
        if (response.campaign) {
          this.screenIds = response.campaign.screenIds; 
          this.fetchScreens(this.screenIds);
        } else {
        }
      },
      error: (error) => {
        console.error('Error fetching campaign details:', error);
      }
    });
  }

  fetchScreens(screenIds: string[]) {
    this.campaignService.getScreensByIds(screenIds).subscribe({
      next: (response) => {
        this.screens = response.screens;
      },
      error: (error) => {
        console.error('Error fetching screens:', error);
      }
    });
  }
  toggleSelection(screen: any) {
    screen.isSelected = !screen.isSelected;
    this.isAllSelected = this.screens.every(s => s.isSelected);
  }

  toggleSelectAll() {
    this.isAllSelected = !this.isAllSelected;
    this.screens.forEach(screen => screen.isSelected = this.isAllSelected);
  }

  getSelectedCount(): number {
    return this.screens.filter(screen => screen.isSelected).length;
  }

  clearSelection() {
    this.isAllSelected = false;
    this.screens.forEach(screen => screen.isSelected = false);
  }
}
