import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CampaignService } from '../../campaign.service';

@Component({
  selector: 'app-campaign-upload-media',
  templateUrl: './campaign-upload-media.component.html',
  styleUrls: ['./campaign-upload-media.component.scss']
})
export class CampaignUploadMediaComponent {
  campaignId: string;
  selectedFiles: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private loaderService: LoaderService
  ) {
    this.campaignId = this.route.snapshot.paramMap.get('campaignId')!;
  }

  ngOnInit(): void {}

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
}
