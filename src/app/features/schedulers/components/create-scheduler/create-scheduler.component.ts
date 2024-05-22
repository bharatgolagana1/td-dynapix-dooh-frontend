import { Component, OnInit  } from '@angular/core';
import { SchedulerService } from '../scheduler.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../video-thumbnails-list/video-thumbnails-list.component';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCardsListComponent } from '../image-cards-list/image-cards-list.component';
import { DeleteScreenComponent } from '../delete-screen/delete-screen.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-scheduler',
  templateUrl: './create-scheduler.component.html',
  styleUrls: ['./create-scheduler.component.scss'],
})
export class CreateSchedulerComponent implements OnInit {
  dateRange: FormGroup; 
  cycleTime: number = 0;
  slotSize: number = 0;
  screenIds: number = 0;
  videoUrls: string = '';
  selectedCycleTime!: string;
  selectedSlotSize!: string;
  isSubmitting: boolean = false;
  selectedVideos: string[] | Video[] = [];
  selectedScreenIds: string[] = [];
  option1 = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
    { label: '30', value: 30 },
    { label: '35', value: 35 },
    { label: '40', value: 40 },
    { label: '45', value: 45 },
    { label: '50', value: 50 },
    { label: '55', value: 55 },
    { label: '60', value: 60 },
  ];
  option2 = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];
  screenCards: any[] = [];
  showAPILoader: boolean  = true;
  toggleCheckbox(card: any) {
    card.selected = !card.selected;
  }
  toggleScreenSelection(screenId: string, checked: boolean): void {
    if (checked) {
      // Push the selected screen ID to the array
      this.selectedScreenIds.push(screenId);
    } else {
      // Remove the selected screen ID from the array
      const index = this.selectedScreenIds.indexOf(screenId);
      if (index !== -1) {
        this.selectedScreenIds.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {
    this.loaderService.showLoader(); // Show loader
    this.schedulerService.getScreensForTenant().subscribe(
      (data: any) => {
        this.screenCards = data.screens;
        this.showAPILoader = false; // Hide loader when data is fetched
        this.loaderService.hideLoader(); // Hide loader
      },
      error => {
        console.error('Error fetching screens:', error);
        this.showAPILoader = true // Hide loader in case of error
        this.loaderService.showLoader(); // Hide loader
      }
    );
  }

  openImageDialog(card: any): void {
    const dialogRef = this.dialog.open(ImageCardsListComponent, {
      width: '80%', // Adjust the width as needed
      data: { images: card.imageUrls }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editScreen(screenId: string) {
    // Navigate to the edit screen component with the screenId as a parameter
    this.router.navigate(['/updateScreen', screenId]);
  }

  deleteScreen(screenId: string) {
    const dialogRef = this.dialog.open(DeleteScreenComponent, {
      width: '250px',
      data: { screenId: screenId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming you have a service to handle API calls for screen deletion
        this.schedulerService.deleteScreen(screenId).subscribe(() => {
          console.log('Screen deleted');
  
          // Find the index of the deleted screen in your screenCards array
          const index = this.screenCards.findIndex(card => card._id === screenId);
  
          // If the screen is found, remove it from the array
          if (index !== -1) {
            this.screenCards.splice(index, 1);
          }
  
          // Alternatively, you can reload data if needed
          // this.loadScreenCards();
        }, error => {
          console.error('Error deleting screen:', error);
          // Handle error if necessary
        });
      }
    });
  }
  
  
  createScheduler() {
    const datePipe = new DatePipe('en-US');
    const formattedStartDate = datePipe.transform(this.dateRange.value.startDate, 'dd-MM-yyyy');
    const formattedEndDate = datePipe.transform(this.dateRange.value.endDate, 'dd-MM-yyyy');

    const schedulerData = {
      cycleTime: this.cycleTime,
      slotSize: this.slotSize,
      screenIds: this.screenIds,
      videoUrls: this.videoUrls.split(',').map((url) => url.trim()),
      startDate: formattedStartDate,
      endDate: formattedEndDate
    };

    this.schedulerService.createScheduler(schedulerData).subscribe(
      (response) => {
        console.log('Scheduler created successfully:', response);
        // Handle success message or redirect to another page
      },
      (error) => {
        console.error('Error creating scheduler:', error);
        // Handle error message
      }
    );
  }

  createSchedulerForm: FormGroup;
  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private schedulerService: SchedulerService,
    private router: Router,
    private loaderService: LoaderService,
    private dialog: MatDialog
  ) {
    this.createSchedulerForm = this.formBuilder.group({
      cycleTime: ['', [Validators.required]],
      slotSize: ['', [Validators.required]],
      selectedVideos: [[], [Validators.required]],
      selectedScreenIds: this.formBuilder.array([]),
    });

    this.dateRange = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  receiveSelectedVideos(selectedVideos: any[]): void {
    this.selectedVideos = selectedVideos.map(video => video);
    this.createSchedulerForm.patchValue({
      selectedVideos: this.selectedVideos,
    });
    const selectedVideosCount = this.selectedVideos.length;
    const slotSize = this.createSchedulerForm.value.slotSize;
    const cycleTime = this.createSchedulerForm.value.cycleTime;
    const totalSlots = (cycleTime * 60) / slotSize;
    if (selectedVideosCount > totalSlots) {
      this.notificationService.showNotification(
        'Selected number of videos exceeds slot size',
        'error'
      );
    }
  }

  onDateChange(): void {
    const datePipe = new DatePipe('en-US');
    const formattedStartDate = datePipe.transform(this.dateRange.value.startDate, 'dd-MM-yyyy');
    const formattedEndDate = datePipe.transform(this.dateRange.value.endDate, 'dd-MM-yyyy');
    this.dateRange.patchValue({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  }

  createSchedulers(): void {
    if (this.createSchedulerForm.valid && !this.isSubmitting) {
      const selectedVideosCount = this.createSchedulerForm.value.selectedVideos.length;
      const slotSize = this.createSchedulerForm.value.slotSize;
      const cycleTime = this.createSchedulerForm.value.cycleTime;
      const selectedVideos = this.selectedVideos.map((video: any) => ({
        id: video._id, // Assuming _id field corresponds to the id in the backend schema
        title: video.title,
        thumbnailUrl: video.thumbnailUrl,
        duration: video.duration,
        uploadTime: video.uploadTime,
        views: '', // Assuming this data is not available in the frontend or optional
        author: video.author,
        videoUrl: video.videoUrl,
        description: video.description,
        subscriber: video.subscriber,
        isLive: video.isLive,
      }));

      const datePipe = new DatePipe('en-US');
      const formattedStartDate = datePipe.transform(this.dateRange.value.startDate, 'dd-MM-yyyy');
      const formattedEndDate = datePipe.transform(this.dateRange.value.endDate, 'dd-MM-yyyy');

      const schedulerData = {
        cycleTime: this.createSchedulerForm.value.cycleTime,
        slotSize: this.createSchedulerForm.value.slotSize,
        selectedScreenIds: this.selectedScreenIds,
        selectedVideos: this.selectedVideos,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      this.isSubmitting = true;
      this.schedulerService.createScheduler(schedulerData).subscribe(
        (response) => {
          console.log('Scheduler created successfully:', response);
          this.notificationService.showNotification(
            'Scheduler created successfully',
            'success'
          );
          this.router.navigate(['/schedulers']);
        },
        (error) => {
          console.error('Error creating scheduler:', error);
        }
      ).add(() => {
        this.isSubmitting = false;
      });
    } else {
      this.isSubmitting = false;
    }
  }
}
