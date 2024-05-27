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
  screenId: string = '1';
  cycleTime!: number;
  slotSize!: number;
  videosURLList: Video[] = [];
  currentVideoIndex: number = 0;
  intervalId: any;
  api: VgApiService | undefined;
  @ViewChild('media') media!: ElementRef;
  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private schedulerService: SchedulerService
  ) {}
  ngAfterViewInit(): void {
    this.fetchSchedulerData();
  }
  startVideoPlayer(): void {
    this.intervalId = setInterval(() => {
      this.playNextVideo();
    }, this.slotSize * 1000);
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
    if (this.videosURLList.length === 0) {
      console.error('No videos available.');
      return;
    }
    const videoIndex = this.currentVideoIndex % this.videosURLList.length;
    const nextVideoIndex = (this.currentVideoIndex + 1) % this.videosURLList.length;
    const currentVideoUrl = this.videosURLList[videoIndex].videoUrl;
    const nextVideoUrl = this.videosURLList[nextVideoIndex].videoUrl;
    if (currentVideoUrl === nextVideoUrl && this.initialVideoPlayed) {
      console.log('Skipping the same video:', currentVideoUrl);
      this.currentVideoIndex++;
      return;
    }
    const videoUrl = nextVideoUrl;
    const videoElement: HTMLVideoElement = this.media.nativeElement;
    videoElement.src = videoUrl;
    videoElement.load();
    videoElement.play();
    console.log('Playing Video:', videoUrl);
    console.log('slot Size:', this.slotSize);
    console.log('Cycle Time:', this.cycleTime);
    this.initialVideoPlayed = true;
    this.currentVideoIndex++;
    if (this.currentVideoIndex === this.videosURLList.length) {
      this.currentVideoIndex = 0;
    }
  }
  fetchSchedulerData(): void {
    const screenId = '2';
    this.schedulerService.getScheduleByScreenId(screenId).subscribe(
      (data: any) => {
        console.log('After API', data.schedules, data.schedules[0]);
        let schedules = data.schedules;
        if (schedules[0].videoUrls?.length > 0) {
          this.videosURLList = schedules[0].videoUrls;
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
