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
  imageUrls: string[] = [];
  currentImageUrl: string | null = null;
  cycleTime!: number;
  slotSize!: number;
  currentIndex = 0;
  intervalId: any;
  noMediaFoundMessage: string | null = null;
  formattedDate: string = '';

  @ViewChild('media') mediaElement!: ElementRef<HTMLVideoElement>;

  constructor(private campaignService: CampaignService ,private datePipe: DatePipe) {}

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
        if (screen && screen._id) {
          this.campaignService.getScreenByIdAndDate(screen._id, formattedDate).subscribe((data: any) => {
            if (data && data.imageUrls && data.imageUrls.length) {
              this.imageUrls = data.imageUrls;
              this.slotSize = data.slotSize;
              this.cycleTime = data.cycleTime;
              this.currentIndex = 0;
              this.noMediaFoundMessage = null;
              this.playImages();
            } else {
              this.noMediaFoundMessage = 'No PlayList found for this screen on the selected date.Please contact support';
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

    if (this.imageUrls && this.imageUrls.length) {
      this.updateCurrentImage();
      this.intervalId = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex >= this.imageUrls.length) {
          this.currentIndex = 0;
        }
        this.updateCurrentImage();
      }, this.slotSize * 1000);
    }
  }

  updateCurrentImage() {
    this.currentImageUrl = this.imageUrls[this.currentIndex];
  }

  reset() {
    this.myControl.reset();
    this.imageUrls = [];
    this.currentImageUrl = null;
    this.slotSize = 0;
    this.cycleTime = 0;
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
