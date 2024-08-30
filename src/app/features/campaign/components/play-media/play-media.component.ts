import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { CampaignService } from '../../campaign.service';

@Component({
  selector: 'app-play-media',
  templateUrl: './play-media.component.html',
  styleUrls: ['./play-media.component.scss']
})
export class PlayMediaComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  imageUrls: string[] = [];
  currentImageUrl: string | null = null;
  cycleTime!: number;
  slotSize!: number;
  currentIndex = 0;
  intervalId: any;
  noMediaFoundMessage: string | null = null;

  @ViewChild('media') mediaElement!: ElementRef<HTMLVideoElement>;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.campaignService.searchScreensByName(value))
    );
  }

  generateScreenName() {
    const screenName = this.myControl.value;
    if (screenName) {
      this.campaignService.getScreenDetailsByName(screenName).subscribe((screen: any) => {
        if (screen && screen.imageUrls && screen.imageUrls.length) {
          this.imageUrls = screen.imageUrls;
          this.slotSize = screen.slotSize;
          this.cycleTime = screen.cycleTime;
          this.currentIndex = 0;
          this.noMediaFoundMessage = null; 
          this.playImages();
        } else {
          this.noMediaFoundMessage = 'No media found for this screen name.'; 
          this.resetMedia(); 
        }
      }, _error => {
        this.noMediaFoundMessage = 'Screen name not found. Please try another search.';
        this.resetMedia(); 
      });
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
