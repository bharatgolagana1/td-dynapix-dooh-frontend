import { Component } from '@angular/core';
import { MediaService } from '../../media.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
interface UploadFile {
  file: File;
  progress: number;
  url?: string;
  thumbnail?: string; // Add thumbnail property
}

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss'],
})
export class UploadMediaComponent {
  files: UploadFile[] = [];

  constructor(private mediaService: MediaService, private notificationService:NotificationService,private router: Router,) {}

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    this.addFiles(fileList);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const fileList: FileList = event.dataTransfer.files;
    this.addFiles(fileList);
  }

  private async addFiles(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      if (file) {
        const thumbnail = await this.generateThumbnail(file);
        const url = URL.createObjectURL(file); // Create object URL for video
        this.files.push({ file, progress: 0, url, thumbnail }); // Include thumbnail in the UploadFile object
      }
    }
  }

  private generateThumbnail(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        // Set the width and height for the thumbnail
        const canvas = document.createElement('canvas');
        canvas.width = 120; // Set your desired thumbnail width
        canvas.height = (canvas.width / video.videoWidth) * video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Draw the video frame onto the canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Get the thumbnail as a base64 encoded URL
          const thumbnailUrl = canvas.toDataURL('image/jpeg');
          resolve(thumbnailUrl);
        } else {
          reject(new Error('Could not create thumbnail.'));
        }
      };
      video.onerror = (error) => {
        reject(error);
      };
      video.src = URL.createObjectURL(file);
    });
  }
  

  async upload() {
    try {
      for (const uploadFile of this.files) {
        const progress = await this.mediaService.uploadMedia(uploadFile.file);
  
        uploadFile.progress = progress;
  
        if (progress === 100) {
          uploadFile.url = uploadFile.thumbnail;
        }
      }
  
      const allFilesUploaded = this.files.every(file => file.progress === 100);
  
      if (allFilesUploaded) {
        this.notificationService.showNotification('Media uploaded successfully', 'success');
        this.router.navigate(['/createScheduler']);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      this.notificationService.showNotification('Error uploading files', 'error');
    }
  }
  
  
  cancelUpload(index: number) {
    if (index >= 0 && index < this.files.length) {
      this.files.splice(index, 1);
    }
  }


  hasFilesToUpload(): boolean {
    return this.files.length > 0;
  }
  

}
