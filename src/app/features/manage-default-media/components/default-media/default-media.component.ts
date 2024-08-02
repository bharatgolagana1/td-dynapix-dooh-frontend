import { Component } from '@angular/core';
import { DefaultMediaService } from '../../default-media-service.service';

@Component({
  selector: 'app-default-media',
  templateUrl: './default-media.component.html',
  styleUrls: ['./default-media.component.scss'],
})
export class DefaultMediaComponent {
  selectedFiles: File[] = [];
  mediaType: string = 'image';
  defaultMedia: any[] = [];

  constructor(private defaultMediaService: DefaultMediaService) {}

  ngOnInit(): void {
    this.loadDefaultMedia();
  }

  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  onUpload(): void {
    if (this.selectedFiles.length > 0 && this.mediaType) {
      const formData = new FormData();
      this.selectedFiles.forEach((file) =>
        formData.append('defaultMediaFiles', file)
      );
      formData.append('type', this.mediaType);

      this.defaultMediaService.uploadDefaultMedia(formData).subscribe(
        (response) => {
          console.log('Default media uploaded successfully:', response);
          this.loadDefaultMedia(); // Reload the media list after upload
        },
        (error) => {
          console.error('Error uploading default media:', error);
        }
      );
    }
  }

  loadDefaultMedia(): void {
    this.defaultMediaService.getDefaultMedia().subscribe(
      (response) => {
        this.defaultMedia = response.defaultMedia;
      },
      (error) => {
        console.error('Error loading default media:', error);
      }
    );
  }
}
