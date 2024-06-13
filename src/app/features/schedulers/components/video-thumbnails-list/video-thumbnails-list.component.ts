import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { SchedulerService } from '../../scheduler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  uploadTime: string;
  views: string;
  author: string;
  videoUrl: string;
  description: string;
  subscriber: string;
  isLive: boolean;
}


@Component({
  selector: 'app-video-thumbnails-list',
  templateUrl: './video-thumbnails-list.component.html',
  styleUrls: ['./video-thumbnails-list.component.scss'],
})
export class VideoThumbnailsListComponent {
  @Output() selectedVideosChange: EventEmitter<Video[] | string[]> = new EventEmitter<Video[] | string[]>();
@Input() 
defaultSelectedVideosList! :any[];
  public videos: any[] = [];
  public selectedVideos: Video[] = [];
  showAPILoader: boolean = true; // Show loader initially
  constructor(private dialog: MatDialog,private schedulerService:SchedulerService,private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loaderService.showLoader(); // Show loader
    this.schedulerService.getVideos().subscribe((videosList: any[]) => {
      if (Array.isArray(videosList) && videosList.length > 0) {
        // Filter out objects that have the expected videoUrl property
        const validVideos = videosList.filter(video => video.videoUrl);
        if (validVideos.length > 0) {
          console.log("Valid video list:", validVideos);
          // Assign unique IDs to videos
          this.videos = validVideos.map((video, index) => ({
            id: index.toString(),
            ...video
          }));

          this.handleDefaultSelection(this.defaultSelectedVideosList)
        } else {
          console.error("No valid videos found.");
        }
      } else {
        console.error("Invalid video list format:", videosList);
      }
      this.showAPILoader = false; // Hide loader when data is fetched
      this.loaderService.hideLoader(); // Hide loader
    });
  }

  openVideoDialog(videoUrl: string): void {
    this.dialog.open(VideoDialogComponent, {
      data: { videoUrl },
    });
  }

  handleDefaultSelection( videoList :any[]){
    console.log("in handle function",this.defaultSelectedVideosList)
    if(this.defaultSelectedVideosList?.length> 0){
      console.log("in handle function with validation")
      this.selectedVideos.push(...this.defaultSelectedVideosList)
    }
  }

  toggleSelection(video: Video): void {
    const index = this.selectedVideos.findIndex((v) => v.id === video.id);
    if (index === -1) {
      this.selectedVideos.push(video);
    } else {
      this.selectedVideos.splice(index, 1);
    }
    console.log('final selected videos', this.selectedVideos);
    this.selectedVideosChange.emit(this.selectedVideos);
  }

  isSelected(video: any): boolean {
    return this.selectedVideos.some(
      (selectedVideo) => selectedVideo.id === video.id
    );
  }
}
