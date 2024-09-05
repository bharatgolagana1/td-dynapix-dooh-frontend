import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { CampaignService } from '../../campaign.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-play-media',
  templateUrl: './play-media.component.html',
  styleUrls: ['./play-media.component.scss']
})
export class PlayMediaComponent implements OnInit {
  myControl = new FormControl();
  dateControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  media: any[] = [];
  currentMediaUrl: string | null = null;
  currentSlotSize!: number;
  currentIndex = 0;
  intervalId: any;
  noMediaFoundMessage: string | null = null;
  formattedDate: string = '';
  isVideo = false;

  @ViewChild('media') mediaElement!: ElementRef<HTMLVideoElement>;

  constructor(private campaignService: CampaignService, private datePipe: DatePipe) {}

  ngOnInit() {
    const currentDate = new Date();
    this.formattedDate = this.datePipe.transform(currentDate, 'dd/MM/yyyy') || '';
    this.dateControl.setValue(currentDate);
    this.dateControl.disable();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.campaignService.searchScreensByName(value))
    );
  }

  generateScreenName() {
    const screenName = this.myControl.value;
    const selectedDate = moment(new Date()).format('YYYY-MM-DD');

    if (screenName) {
      this.campaignService.getScreenDetailsByName(screenName).subscribe((screen: any) => {
        if (screen && screen._id && screen.organizationId) {
          this.campaignService.getPlaylistByScreenIdAndDate(screen._id, selectedDate, screen.organizationId).subscribe((data: any) => {
            if (data && data.length && data[0].media && data[0].media.length) {
              this.media = data[0].media; 
              this.currentIndex = 0;
              this.noMediaFoundMessage = null;
              this.playImages();
            } else {
              this.noMediaFoundMessage = 'Failed to fetch playlist';
              this.resetMedia();
            }
          }, _error => {
            this.noMediaFoundMessage = 'No PlayList found for this screen on the selected date. Please contact support.';
            this.resetMedia();
          });
        } else {
          this.noMediaFoundMessage = 'Screen ID not found for the provided screen name.';
          this.resetMedia();
        }
      }, _error => {
        this.noMediaFoundMessage = 'Screen name not found. Please try another search.';
        this.resetMedia();
      });
    } else {
      this.noMediaFoundMessage = 'Please enter a screen name.';
    }
  }

  playImages() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.media && this.media.length) {
      this.updateCurrentMedia();
      this.intervalId = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex >= this.media.length) {
          this.currentIndex = 0;
        }
        this.updateCurrentMedia();
      }, this.currentSlotSize * 1000);
    }
  }

  updateCurrentMedia() {
    const currentMedia = this.media[this.currentIndex];

    if (currentMedia && currentMedia.mediaURL) {
      this.currentMediaUrl = currentMedia.mediaURL;
      this.currentSlotSize = currentMedia.slotSize;

      if (this.isVideoFile(this.currentMediaUrl||'')) {
        this.isVideo = true;
        this.playVideo();
      } else {
        this.isVideo = false;
        this.resetVideo();
      }
    } else {
      this.currentMediaUrl = null;
      console.error('No media found for the current index.');
    }
  }

  isVideoFile(url: string): boolean {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const extension = url.split('.').pop();
    return videoExtensions.includes(extension || '');
  }

  playVideo() {
    if (this.mediaElement && this.mediaElement.nativeElement && this.currentMediaUrl) {
      const videoElement: HTMLVideoElement = this.mediaElement.nativeElement;
      videoElement.src = this.currentMediaUrl;
      videoElement.load();
      videoElement.play();
    } else {
      console.error('No valid media URL to play.');
    }
  }

  reset() {
    this.myControl.reset();
    this.media = [];
    this.currentMediaUrl = null;
    this.currentSlotSize = 0;
    this.noMediaFoundMessage = null;
    this.isVideo = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetVideo() {
    if (this.mediaElement && this.mediaElement.nativeElement) {
      this.mediaElement.nativeElement.pause();
      this.mediaElement.nativeElement.src = ''; 
    }
  }

  resetMedia() {
    this.currentMediaUrl = null;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getCurrentImageUrl(): string {
    return this.currentMediaUrl ?? '';
  }
}
