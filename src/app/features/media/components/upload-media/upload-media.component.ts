import { Component } from '@angular/core';
import { MediaService } from '../../media.service';

interface UploadFile {
  file: File;
  progress: number;
}

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss'],
})
export class UploadMediaComponent {
  files: UploadFile[] = [];

  constructor(private mediaService: MediaService) {}

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    this.files = Array.from(fileList).map((file) => ({ file, progress: 0 }));
  }

  async upload() {
    for (const uploadFile of this.files) {
      try {
        const progress = await this.mediaService.uploadMedia(uploadFile.file);
        uploadFile.progress = progress;
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error, e.g., show error message
      }
    }
  }
}
