import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SchedulerService } from '../../scheduler.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCardsListComponent } from '../image-cards-list/image-cards-list.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-screens',
  templateUrl: './public-screens.component.html',
  styleUrls: ['./public-screens.component.scss'] // Updated to scss
})
export class PublicScreensComponent implements OnInit {
  screenCards: any[] = [];

  @ViewChild('availableScreensSection', { static: false })
  availableScreensSection!: ElementRef;

  constructor(
    private schedulerService: SchedulerService,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchAvailableScreens();
  }

  fetchAvailableScreens(): void {
    const today = new Date();
    const datePipe = new DatePipe('en-US');
    const formattedStartDate = datePipe.transform(today, 'dd-MM-yyyy');
    const formattedEndDate = datePipe.transform(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), 'dd-MM-yyyy');

    if (formattedStartDate && formattedEndDate) {
      this.schedulerService.getAvailableScreens(formattedStartDate, formattedEndDate).subscribe(
        (data: any) => {
          this.screenCards = data.availableScreens;
          this.loaderService.hideLoader();
        },
        (error) => {
          console.error('Error fetching available screens:', error);
          if (error.error && error.error.error) {
            console.error('Backend error message:', error.error.error);
          }
          this.loaderService.hideLoader(); // Hide loader on error
          this.notificationService.showNotification('Error fetching available screens', 'error');
        }
      );
    } else {
      console.error('Invalid date format');
      this.notificationService.showNotification('Invalid date format', 'error');
    }
  }

  openImageDialog(card: any): void {
    const dialogRef = this.dialog.open(ImageCardsListComponent, {
      width: '80%',
      data: { images: card.imageUrls },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
