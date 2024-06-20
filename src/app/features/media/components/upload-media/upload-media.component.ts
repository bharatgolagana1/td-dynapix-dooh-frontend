import { Component } from '@angular/core';
import { MediaService } from '../../media.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UploadSuccessDialogComponent } from '../upload-success-dialog/upload-success-dialog.component';
import { Subscription } from 'rxjs';

interface UploadFile {
  file: File;
  progress: number;
  url?: string;
  thumbnail?: string;
  uploadSubscription?: Subscription;
  isVideo?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss'],
})
export class UploadMediaComponent {
  files: UploadFile[] = [];
  isUploading: boolean = false;

  constructor(
    private mediaService: MediaService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

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
        const url = URL.createObjectURL(file);
        const isVideo = file.type.startsWith('video/');
        let thumbnail = '';
        if (isVideo) {
          thumbnail = await this.generateThumbnail(file);
        } else {
          thumbnail = url;
        }
        this.files.push({ file, progress: 0, url, thumbnail, isVideo });
      }
    }
  }

  private generateThumbnail(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = (canvas.width / video.videoWidth) * video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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
    this.isUploading = true;
    try {
      for (const uploadFile of this.files) {
        const uploadSubscription = this.mediaService.uploadMedia(uploadFile.file, uploadFile.isVideo ? 'video' : 'image').subscribe({
          next: (progress) => {
            uploadFile.progress = progress;
            if (progress === 100) {
              uploadFile['uploaded'] = true;
            }
          },
          error: (error) => {
            console.error('Error uploading files:', error);
            this.notificationService.showNotification('Error uploading files', 'error');
            this.isUploading = false;
          },
          complete: () => {
            const allFilesUploaded = this.files.every(file => file.progress === 100);
            if (allFilesUploaded) {
              this.openSuccessDialog();
            }
          }
        });
        uploadFile.uploadSubscription = uploadSubscription;
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      this.notificationService.showNotification('Error uploading files', 'error');
      this.isUploading = false;
    }
  }

  cancelUpload(index: number) {
    if (index >= 0 && index < this.files.length) {
      const uploadFile = this.files[index];
      if (uploadFile.uploadSubscription) {
        uploadFile.uploadSubscription.unsubscribe();
      }
      this.files.splice(index, 1);
    }
  }

  openSuccessDialog() {
    const dialogRef = this.dialog.open(UploadSuccessDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/createScheduler']).then(() => {
        setTimeout(() => {
          this.isUploading = false;
        }, 3000);
      });
    });
  }

  hasFilesToUpload(): boolean {
    return this.files.length > 0;
  }
}
