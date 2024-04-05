import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-screen-scheduler',
  templateUrl: './screen-scheduler.component.html',
  styleUrls: ['./screen-scheduler.component.scss']
})
export class ScreenSchedulerComponent {
  screenId: string = '123'; // Default screen ID
  cycleTime: number = 180; // Default cycle time in seconds (3 minutes)
  slotSize: number = 10; // Default slot size in seconds (10 seconds)
  videosURLList: string[] = []; // Array to store video URLs
  currentVideoIndex: number = 0; // Index of the currently playing video
  intervalId: any; // Interval ID for video player

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchSchedulerData();
  }

  fetchSchedulerData(): void {
    // Make API call to scheduler to get scheduling information
    // For now, we'll use temporary response
    this.http.get<any>('API_ENDPOINT_HERE?screenId=' + this.screenId).subscribe(response => {
      this.videosURLList = response.videosURLList;
      this.startVideoPlayer();
    }, error => {
      console.error('Failed to fetch scheduler data:', error);
    });
  }

  startVideoPlayer(): void {
    this.intervalId = setInterval(() => {
      this.playNextVideo();
    }, this.slotSize * 1000); // Convert slot size to milliseconds
  }

  playNextVideo(): void {
    const videoUrl = this.videosURLList[this.currentVideoIndex % this.videosURLList.length];
    this.playVideo(videoUrl);
    this.currentVideoIndex++;
  }

  playVideo(videoUrl: string): void {
    // Implement logic to play the video based on the URL
    console.log('Playing video:', videoUrl);
  }
}