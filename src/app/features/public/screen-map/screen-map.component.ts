import { Component, Inject, PLATFORM_ID, OnInit, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SchedulerService } from '../../schedulers/scheduler.service';
import * as L from 'leaflet';
import * as moment from 'moment';

interface Screen {
  locationCoordinates: string;
  screenName: string;
  address: string;
  imageUrls: string[];
  _id: string;
  organizationId: string;
  slotSize: number;
}

declare global {
  interface Window {
    showLive: (screenId: string, organizationId: string) => void;
  }
}

@Component({
  selector: 'app-screen-map',
  templateUrl: './screen-map.component.html',
  styleUrls: ['./screen-map.component.scss'],
})
export class ScreenMapComponent implements OnInit, AfterViewInit {
  private leaflet: any;
  private customIcon: any;
  private map: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private schedulerService: SchedulerService
  ) {}

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  async ngOnInit() {
    if (this.isBrowser) {
      this.leaflet = L;

      this.customIcon = this.leaflet.icon({
        iconUrl: 'assets/icons/p3icon.png',
        iconSize: [15, 15],
        iconAnchor: [15, 42],
        popupAnchor: [0, -42],
      });

      this.initializeMap();
    }
  }

  private initializeMap() {
    if (!this.leaflet) {
      return;
    }

    this.map = this.leaflet.map('map').setView([17.7201, 83.304], 12);
    this.leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(this.map);

    this.loadMarkers(this.map);
  }

  private generatePopupHTML(
    screenName: string,
    address: string,
    locationCoordinates: string,
    screenId: string,
    organizationId: string
  ): string {
    return `
      <div class="popup-content" style="text-align:center;justify-content: center;">
       <div id="media-container-${screenId}"></div>
        <div id="message-container-${screenId}" style="display: none; color: red; margin-bottom: 10px;"></div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="text-align:start; display: inline-block; margin: 0;">${screenName}</h3>
            <button
          style="display: inline-block; margin-left: 10px; cursor: pointer; background-color: #007bff; color: white; border: none; border-radius: 5px;"
          onmouseover="this.style.backgroundColor='#0056b3';"
          onmouseout="this.style.backgroundColor='#007bff';"
          onclick="window.showLive('${screenId}', '${organizationId}')">
          Show Live
        </button>
        </div>
        <p style="text-align:start;">${address}</p>
        <p style="text-align:start;">${locationCoordinates}</p>
      </div>`;
  }

  private loadMarkers(map: any) {
    const filters = {
      addressOrPincode: '',
      screenType: 'Both',
      size: 'All',
      status: 'Both',
      date: 'All Time',
      fromDate: '',
      toDate: '',
    };

    this.schedulerService.screensList(filters).subscribe((response) => {
      const screens: Screen[] = response.screens;

      screens.forEach((screen: Screen) => {
        const coordinates = screen.locationCoordinates.split(',').map(Number);
        const marker = this.leaflet
          .marker([coordinates[0], coordinates[1]], { icon: this.customIcon })
          .addTo(map);

        const popupContent = this.generatePopupHTML(
          screen.screenName,
          screen.address,
          screen.locationCoordinates,
          screen._id,
          screen.organizationId
        );
        marker.bindPopup(popupContent, {
          autoPan: true,
          maxWidth: 250,
          minWidth: 200,
        });
      });
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      window.showLive = (screenId: string, organizationId: string) => {
        const currentDate = moment().format('YYYY-MM-DD');
  
        this.schedulerService
          .getPlaylistByScreenIdAndDate(screenId, currentDate, organizationId)
          .subscribe(
            (data) => {
              if (data && data.length && data[0].media && data[0].media.length) {
                const mediaContainerId = `media-container-${screenId}`;
                const messageContainerId = `message-container-${screenId}`;
                const slotSize = data[0].slotSize;
                const messageContainer = document.getElementById(messageContainerId);
                if (messageContainer) {
                  messageContainer.style.display = 'none';
                }
  
                this.playMediaInLoop(data[0].media, mediaContainerId, slotSize);
              } else {
                this.showErrorMessage(screenId, 'No PlayList found for this screen. Please contact support..');
              }
            },
            (error) => {
              this.showErrorMessage(screenId, 'No PlayList found for this screen. Please contact support.');
              console.error('Error retrieving playlist:', error);
            }
          );
      };
    }
  }
  
  private showErrorMessage(screenId: string, message: string) {
    const messageContainerId = `message-container-${screenId}`;
    const messageContainer = document.getElementById(messageContainerId);
    
    if (messageContainer) {
      messageContainer.style.display = 'block'; 
      messageContainer.innerText = message; 
    } else {
      console.error(`Message container with ID ${messageContainerId} not found.`);
    }
  }
  
  private playMediaInLoop(media: any[], mediaContainerId: string, slotSize: number) {
    const mediaContainer = document.getElementById(mediaContainerId);

    if (mediaContainer) {
      let currentMediaIndex = 0;

      const showNextMedia = () => {
        mediaContainer.innerHTML = '';

        const mediaItem = media[currentMediaIndex];
        const mediaElement = document.createElement(
          this.isVideoFile(mediaItem.mediaURL) ? 'video' : 'img'
        );

        if (this.isVideoFile(mediaItem.mediaURL)) {
          mediaElement.setAttribute('controls', 'true');
          mediaElement.setAttribute('autoplay', 'true');
        }

        mediaElement.setAttribute('src', mediaItem.mediaURL);
        mediaElement.setAttribute('style', 'width: 100%; height: auto; margin-bottom: 10px;');
        mediaContainer.appendChild(mediaElement);

      
        currentMediaIndex = (currentMediaIndex + 1) % media.length;
        setTimeout(showNextMedia, slotSize*1000);
      };

      showNextMedia(); 
    } else {
      console.error(`Media container with ID ${mediaContainerId} not found.`);
    }
  }

  private isVideoFile(url: string): boolean {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const extension = url.split('.').pop();
    return videoExtensions.includes(extension || '');
  }
}
