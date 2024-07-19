import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SchedulerService } from '../../scheduler.service';
import * as L from 'leaflet';

interface Screen {
  locationCoordinates: string;
  screenName: string;
  address: string;
  imageUrls: string[];
}

declare global {
  interface Window {
    changeSlide: (n: number) => void;
  }
}

@Component({
  selector: 'app-screen-map',
  templateUrl: './screen-map.component.html',
  styleUrls: ['./screen-map.component.scss']
})
export class ScreenMapComponent implements OnInit {
  private leaflet: any;
  private customIcon: any;

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

      // Define custom icon using the provided image
      this.customIcon = this.leaflet.icon({
        iconUrl: 'assets/icons/p3icon.png',
        iconSize: [15, 15],
        iconAnchor: [15, 42],
        popupAnchor: [0, -42]
      });

      this.initializeMap();
      this.addSliderFunctionality();
    }
  }

  private initializeMap() {
    if (!this.leaflet) {
      return; // Leaflet may not be loaded in non-browser environments
    }

    const map = this.leaflet.map('map').setView([17.7201, 83.3040], 12);
    this.leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.loadMarkers(map);
  }

  private generatePopupHTML(screenName: string, address: string, locationCoordinates: string, images: string[]): string {
    const slides = images.map((img, idx) => `
      <img class="slide" src="${img}" style="display:${idx === 0 ? 'inline-flex' : 'none'}; width:12rem; height:12rem;justify-content:center; text-align: center;" alt="${screenName}">
    `).join('');

    return `
      <div class="popup-content" style="text-align:center;justify-content: center;">
          <div styles="justify-content: center;">
          ${slides}
        </div>
        <h3>${screenName}</h3>
        <p>${address}</p>
        <p>${locationCoordinates}</p>
   
        <div class="slider-controls">
          <button class="prev" onclick="window.changeSlide(-1)">❮</button>
          <button class="next" onclick="window.changeSlide(1)">❯</button>
        </div>
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
      toDate: ''
    };

    this.schedulerService.screensList(filters).subscribe((response) => {
      const screens: Screen[] = response.screens;

      screens.forEach((screen: Screen) => {
        const coordinates = screen.locationCoordinates.split(',').map(Number);
        const marker = this.leaflet.marker([coordinates[0], coordinates[1]], { icon: this.customIcon }).addTo(map);

        const popupContent = this.generatePopupHTML(screen.screenName, screen.address, screen.locationCoordinates, screen.imageUrls);
        marker.bindPopup(popupContent, { autoPan: true, maxWidth: 250, minWidth: 200,  });
      });
    });
  }

  private addSliderFunctionality() {
    window.changeSlide = (n: number) => {
      const slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>;
      let currentIndex = Array.from(slides).findIndex(slide => slide.style.display === 'block');

      if (currentIndex === -1) {
        slides[0].style.display = 'block';
        return;
      }

      slides[currentIndex].style.display = 'none';
      const nextIndex = (currentIndex + n + slides.length) % slides.length;
      slides[nextIndex].style.display = 'block';
    };

    // Initialize the first slide to be visible
    setTimeout(() => {
      const slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>;
      if (slides.length > 0) {
        slides[0].style.display = 'block';
      }
    }, 0);
  }
}
