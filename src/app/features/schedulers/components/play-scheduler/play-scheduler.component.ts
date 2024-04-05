import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { SchedulerService } from '../scheduler.service';
import { Video } from '../video-thumbnails-list/video-thumbnails-list.component';

@Component({
  selector: 'app-play-scheduler',
  templateUrl: './play-scheduler.component.html',
  styleUrls: ['./play-scheduler.component.scss'],
})
export class PlaySchedulerComponent implements AfterViewInit {
  screenId: string = '1'; // Default screen ID
  cycleTime!: number; // Default cycle time in seconds (1 minute)
  slotSize!: number; // Default slot size in seconds (10 seconds)
  videosURLList: Video[] = []; // Array to store video URLs
  currentVideoIndex: number = 0; // Index of the currently playing video
  intervalId: any; // Interval ID for video player
  api: VgApiService | undefined;
  @ViewChild('media') media!: ElementRef; // ViewChild reference to the video element

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private schedulerService: SchedulerService
  ) {}

  ngAfterViewInit(): void {
    // Get the VgApiService instance after the view has been initialized
    this.fetchSchedulerData();
  }

  startVideoPlayer(): void {
    // Start the video player
    this.intervalId = setInterval(() => {
      this.playNextVideo();
    }, this.slotSize * 1000); // Convert slot size to milliseconds
  }

  getCurrentVideoUrl(): string | undefined {
    if (this.videosURLList.length > 0) {
      const videoIndex = this.currentVideoIndex % this.videosURLList.length;
      return this.videosURLList[videoIndex].videoUrl;
    }
    return undefined;
  }

  initialVideoPlayed: boolean = false;

  playNextVideo(): void {
    // Play the next video
    if (this.videosURLList.length === 0) {
      console.error('No videos available.');
      return;
    }

    const videoIndex = this.currentVideoIndex % this.videosURLList.length;
    const videoUrl = this.videosURLList[videoIndex].videoUrl; // Access the videoUrl property

    // Access the native video element using ViewChild
    const videoElement: HTMLVideoElement = this.media.nativeElement;

    // Set the src attribute directly on the video element
    videoElement.src = videoUrl;
    // Call load() and play() to load the new source and play the video
    videoElement.load();
    videoElement.play();

    // Log video URL and cycle time
    console.log('Playing Video:', videoUrl);
    console.log('slot Size:', this.slotSize);
    console.log('Cycle Time:', this.cycleTime);

    // Update index for the next video
    this.currentVideoIndex++;

    // Reset video index if it reaches the end of the list
    if (this.currentVideoIndex === this.videosURLList.length) {
      this.currentVideoIndex = 0;
    }
  }
  fetchSchedulerData(): void {
    const screenId = '2'; // or fetch dynamically based on your requirements
    this.schedulerService.getScheduleByScreenId(screenId).subscribe(
      (data: any) => {
        // Corrected parenthesis and added parameter type
        console.log('After API', data.schedules, data.schedules[0]);
        let schedules = data.schedules;
        if (schedules[0].videoUrls?.length > 0) {
          this.videosURLList = schedules[0].videoUrls; // Assign videoUrls directly
          this.cycleTime = schedules[0].cycleTime;
          this.slotSize = schedules[0].slotSize;
          this.startVideoPlayer();
        }
      },
      (error: any) => {
        console.error('Error fetching scheduler data:', error);
      }
    );
  }
}
