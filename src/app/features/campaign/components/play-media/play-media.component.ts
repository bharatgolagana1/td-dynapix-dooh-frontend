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
  currentImageUrl: string | null = null;
  currentSlotSize!: number;
  currentIndex = 0;
  intervalId: any;
  noMediaFoundMessage: string | null = null;
  formattedDate: string = '';

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
    const selectedDate = this.dateControl.value;
  
    if (screenName && selectedDate) {
      const isValidDate = moment(selectedDate, moment.ISO_8601, true).isValid();
  
      if (!isValidDate) {
        this.noMediaFoundMessage = 'Invalid date selected. Please choose a valid date.';
        return;
      }
  
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
  
      this.campaignService.getScreenDetailsByName(screenName).subscribe((screen: any) => {
        if (screen && screen._id && screen.organizationId) {
       
          this.campaignService.getPlaylistByScreenIdAndDate(screen._id, formattedDate, screen.organizationId).subscribe((data: any) => {
            console.log('api' , data)
            if (data && data.media && data.media.length) {
              this.media = data.media; 
              this.currentIndex = 0;
              this.noMediaFoundMessage = null;
              this.playImages(); 
      
            } else {
              this.noMediaFoundMessage = 'No PlayList found for this screen on the selected date';
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
    this.currentImageUrl = currentMedia.mediaURL;
    this.currentSlotSize = currentMedia.slotSize;
  }

  reset() {
    this.myControl.reset();
    this.media = [];
    this.currentImageUrl = null;
    this.currentSlotSize = 0;
    this.noMediaFoundMessage = null;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetMedia() {
    this.currentImageUrl = null;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getCurrentImageUrl(): string {
    return this.currentImageUrl || '';
  }
}
