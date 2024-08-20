import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignService } from '../../campaign.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-upload-media-dialog',
  templateUrl: './upload-media-dialog.component.html',
  styleUrls: ['./upload-media-dialog.component.scss'],
})
export class UploadMediaDialogComponent {
  selectedFiles: File[] = [];

  constructor(
    private dialogRef: MatDialogRef<UploadMediaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private campaignService: CampaignService,
    private loaderService: LoaderService
  ) {}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpload(): void {
    if (this.selectedFiles.length > 0) {
      this.loaderService.showLoader();
      const formData = new FormData();
      formData.append('campaignId', this.data.campaignId);
      this.selectedFiles.forEach((file) => formData.append('mediaFiles', file));

      this.campaignService.uploadMedia(formData).subscribe(
        () => {
          this.loaderService.hideLoader();
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error uploading media:', error);
          this.loaderService.hideLoader();
        }
      );
    }
  }
}
