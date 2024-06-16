import { Component, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/core/services/loader.service';
import { SchedulerService } from 'src/app/features/schedulers/scheduler.service';

interface MediaItem {
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
    private schedulerService: SchedulerService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.schedulerService.getVideos().subscribe((videosList: any[]) => {
      if (Array.isArray(videosList) && videosList.length > 0) {
        const validVideos = videosList.filter((video) => video.thumbnailUrl);
        if (validVideos.length > 0) {
          console.log('Valid video list:', validVideos);
          this.mediaItems = validVideos.map((video) => ({
            date: video.date,
            thumbnailUrl: video.thumbnailUrl,
            videoUrl: video.videoUrl,
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
}
