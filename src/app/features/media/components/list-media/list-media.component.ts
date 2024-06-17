import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MediaService } from '../../media.service';
import { ListMediaDeleteComponent } from '../list-media-delete/list-media-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ListMediaVideoDialogComponent } from '../list-media-video-dialog/list-media-video-dialog.component';

interface MediaItem {
  _id: string;
  date: string;
  thumbnailUrl: string;
  videoUrl: string;
}

@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.scss'],
})
export class ListMediaComponent implements OnInit {
  mediaItems: MediaItem[] = [];
  showAPILoader: boolean = true; 


  constructor(
    private mediaService: MediaService,
    private loaderService: LoaderService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.mediaService.getVideos().subscribe((videosList: any[]) => {
      if (Array.isArray(videosList) && videosList.length > 0) {
        const validVideos = videosList.filter((video) => video.thumbnailUrl);
        if (validVideos.length > 0) {
          console.log('Valid video list:', validVideos);
          this.mediaItems = validVideos.map((video) => ({
            date: video.date,
            thumbnailUrl: video.thumbnailUrl,
            videoUrl: video.videoUrl,
            _id: video._id,
          }));
        } else {
          console.error('No valid videos found.');
        }
      } else {
        console.error('Invalid video list format:', videosList);
      }
      this.showAPILoader = false;
      this.loaderService.hideLoader();
    });
  }

  openDeleteDialog(item: MediaItem): void {
    const dialogRef = this.dialog.open(ListMediaDeleteComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteMedia(item._id);
      }
    });
  }

  openVideoDialog(videoUrl: string): void {
    this.dialog.open(ListMediaVideoDialogComponent, {
      data: { videoUrl },
    });
  }


  deleteMedia(id: string): void {
    this.mediaService.deleteMedia(id).subscribe(
      (response) => {
        console.log('Media deleted successfully', response);
        this.mediaItems = this.mediaItems.filter((item) => item._id !== id);
        this.notificationService.showNotification('media deleted successfully.', 'success');
      },
      (error) => {
        console.error('Error deleting media', error);
        this.notificationService.showNotification('Failed to delete media. Please try again.', 'error');
      }
    );
  }
}
