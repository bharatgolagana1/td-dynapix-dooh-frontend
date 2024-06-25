import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../../scheduler.service';
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
  cycleTime: number = 0;
  slotSize: number = 0;
  screenIds: number = 0;
  videoUrls: string = '';
  selectedCycleTime!: string;
  selectedSlotSize!: string;
  isSubmitting: boolean = false;
  selectedVideos: string[] | Video[] = [];
  selectedScreenIds: string[] = [];
  createSchedulerForm: FormGroup;
  dateRange: FormGroup;
  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private schedulerService: SchedulerService,
    private router: Router,
    private loaderService: LoaderService,
    private dialog: MatDialog
  ) {
    this.createSchedulerForm = this.formBuilder.group({
      schedulerName: ['', Validators.required],
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
  showAPILoader: boolean = true;
  showAvailableScreens: boolean = false;

  toggleCheckbox(card: any) {
    card.selected = !card.selected;
  }
  toggleScreenSelection(screenId: string, checked: boolean): void {
    if (checked) {
      this.selectedScreenIds.push(screenId);
    } else {
      const index = this.selectedScreenIds.indexOf(screenId);
      if (index !== -1) {
        this.selectedScreenIds.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {}

  onContinue() {
    const startDate = this.dateRange.value.startDate;
    const endDate = this.dateRange.value.endDate;
    this.fetchAvailableScreens(startDate, endDate);
    this.showAvailableScreens = true;
  }

  fetchAvailableScreens(startDate: Date, endDate: Date): void {
    const datePipe = new DatePipe('en-US');
    const formattedStartDate = datePipe.transform(startDate, 'dd-MM-yyyy');
    const formattedEndDate = datePipe.transform(endDate, 'dd-MM-yyyy');
  
    if (formattedStartDate && formattedEndDate) {
      this.schedulerService.getAvailableScreens(formattedStartDate, formattedEndDate).subscribe(
        (data: any) => {
          this.screenCards = data.availableScreens;
          this.showAPILoader = false;
          this.loaderService.hideLoader();
        },
        (error) => {
          console.error('Error fetching available screens:', error);
          if (error.error && error.error.error) {
            console.error('Backend error message:', error.error.error);
          }
          this.showAPILoader = true; // Show loader if necessary
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

  createScheduler() {
    const datePipe = new DatePipe('en-US');
    const formattedStartDate = datePipe.transform(
      this.dateRange.value.startDate,
      'dd-MM-yyyy'
    );
    const formattedEndDate = datePipe.transform(
      this.dateRange.value.endDate,
      'dd-MM-yyyy'
    );

    const schedulerName = this.createSchedulerForm.value.schedulerName;
    const schedulerData = {
      schedulerName: schedulerName,
      cycleTime: this.cycleTime,
      slotSize: this.slotSize,
      screenIds: this.screenIds,
      videoUrls: this.videoUrls.split(',').map((url) => url.trim()),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    this.schedulerService.createScheduler(schedulerData).subscribe(
      (response) => {
        console.log('Scheduler created successfully:', response);
      },
      (error) => {
        console.error('Error creating scheduler:', error);
      }
    );
  }

  dateFilter = function (a: Date | null): boolean {
    const today = new Date();
    if (a) {
      const formattedToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const formattedDate = new Date(a.getFullYear(), a.getMonth(), a.getDate());
      return formattedDate >= formattedToday;
    }
    return false;
  };

  receiveSelectedVideos(selectedVideos: any[]): void {
    this.selectedVideos = selectedVideos.map((video) => video);
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
    const formattedStartDate = datePipe.transform(
      this.dateRange.value.startDate,
      'dd-MM-yyyy'
    );
    const formattedEndDate = datePipe.transform(
      this.dateRange.value.endDate,
      'dd-MM-yyyy'
    );
    this.dateRange.patchValue({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  }

  createSchedulers(): void {
    if (this.createSchedulerForm.valid && !this.isSubmitting) {
      const selectedVideosCount =
        this.createSchedulerForm.value.selectedVideos.length;
      const slotSize = this.createSchedulerForm.value.slotSize;
      const cycleTime = this.createSchedulerForm.value.cycleTime;
      const schedulerName = this.createSchedulerForm.value.schedulerName;
      const selectedVideos = this.selectedVideos.map((video: any) => ({
        id: video._id,
        title: video.title,
        thumbnailUrl: video.thumbnailUrl,
        duration: video.duration,
        uploadTime: video.uploadTime,
        views: '',
        author: video.author,
        videoUrl: video.videoUrl,
        description: video.description,
        subscriber: video.subscriber,
        isLive: video.isLive,
      }));

      const datePipe = new DatePipe('en-US');
      const formattedStartDate = datePipe.transform(
        this.dateRange.value.startDate,
        'dd-MM-yyyy'
      );
      const formattedEndDate = datePipe.transform(
        this.dateRange.value.endDate,
        'dd-MM-yyyy'
      );

      const schedulerData = {
        schedulerName: schedulerName,
        cycleTime: this.createSchedulerForm.value.cycleTime,
        slotSize: this.createSchedulerForm.value.slotSize,
        selectedScreenIds: this.selectedScreenIds,
        selectedVideos: this.selectedVideos,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      this.isSubmitting = true;
      this.schedulerService
        .createScheduler(schedulerData)
        .subscribe(
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
        )
        .add(() => {
          this.isSubmitting = false;
        });
    } else {
      this.isSubmitting = false;
    }
  }
}
