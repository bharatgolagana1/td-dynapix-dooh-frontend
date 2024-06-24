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
  videoUrl?: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.scss'],
})
export class ListMediaComponent implements OnInit {
  mediaItems: MediaItem[] = [];
  showAPILoader: boolean = true; 
  selectedMediaType = 'both';

  constructor(
    private mediaService: MediaService,
    private loaderService: LoaderService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.fetchMedia();
  }

  fetchMedia() {
    this.mediaService.getMedia(this.selectedMediaType).subscribe(
      (mediaList: any[]) => {
        if (Array.isArray(mediaList) && mediaList.length > 0) {
          this.mediaItems = mediaList.map((media) => ({
            date: media.date,
            thumbnailUrl: media.thumbnailUrl,
            videoUrl: media.videoUrl,
            imageUrl: media.imageUrl,
            _id: media._id,
          }));
        } else {
          console.error('Invalid media list format:', mediaList);
        }
        this.showAPILoader = false;
        this.loaderService.hideLoader();
      },
      (error) => {
        console.error('Error fetching media:', error);
        this.showAPILoader = false;
        this.loaderService.hideLoader();
      }
    );
  }

  onMediaTypeChange(mediaType: string) {
    this.selectedMediaType = mediaType;
    this.fetchMedia();
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
        this.notificationService.showNotification('Media deleted successfully.', 'success');
      },
      (error) => {
        console.error('Error deleting media', error);
        this.notificationService.showNotification('Failed to delete media. Please try again.', 'error');
      }
    );
  }
}
