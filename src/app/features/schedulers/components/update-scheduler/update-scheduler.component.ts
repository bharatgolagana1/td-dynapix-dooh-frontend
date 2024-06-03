import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../scheduler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../video-thumbnails-list/video-thumbnails-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCardsListComponent } from '../image-cards-list/image-cards-list.component';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
  selector: 'app-update-scheduler',
  templateUrl: './update-scheduler.component.html',
  styleUrls: ['./update-scheduler.component.scss'],
  providers: [DatePipe], // Add DatePipe to providers
})
export class UpdateSchedulerComponent implements OnInit {
  dateRange: FormGroup;
  updateSchedulerForm: FormGroup;
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
  selectedSlotSize!: number;
  selectedCycleTime!: number;
  selectedVideos: Video[] = [];
  screenCards: any[] = [];
  showAPILoader: boolean = false;
  isSubmitting = false;
  selectedScreenIds: string[] = [];
  defaultSelectedVideosList :any[] = [];

  constructor(
    private fb: FormBuilder,
    private schedulerService: SchedulerService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private notificationService: NotificationService
  ) {
    this.dateRange = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.updateSchedulerForm = this.fb.group({
      schedulerName: ['', Validators.required],
      slotSize: ['', Validators.required],
      cycleTime: ['', Validators.required],
      selectedVideos: [[], Validators.required],
      selectedScreenIds: [[], Validators.required],
      dateRange: this.dateRange,
    });
  }

  ngOnInit(): void {
    const schedulerId = this.route.snapshot.paramMap.get('id');
    if (schedulerId) {
      this.loadSchedulerData(schedulerId);  
    }
    this.loadScreens();
  }

private loadSchedulerData(schedulerId: string): void {
  this.schedulerService.getSchedulerById(schedulerId).subscribe(
    (data: any) => {
      this.defaultSelectedVideosList = data.scheduler.videoUrls;
      const selectedVideos: Video[] = data.scheduler.videoUrls.map((video: any) => {
        return {
          id: video._id,
          title: video.title,
          thumbnailUrl: video.thumbnailUrl,
          videoUrl:video.videoUrl
        };
      });

      const startDate = new Date(data.scheduler.startDate.split('-').reverse().join('-'));
      const endDate = new Date(data.scheduler.endDate.split('-').reverse().join('-'));

      this.updateSchedulerForm.patchValue({
        schedulerName: data.scheduler.schedulerName,
        slotSize: data.scheduler.slotSize,
        cycleTime: data.scheduler.cycleTime,
        selectedVideos: selectedVideos,
        selectedScreenIds: data.scheduler.screenIds,
        dateRange: {
          startDate: startDate,
          endDate: endDate,
        }
      });

      this.selectedVideos = selectedVideos;
      this.selectedScreenIds = data.scheduler.screenIds;
    },
    error => {
      console.error('Error loading scheduler data:', error);
    }
  );
}


  private loadScreens(): void {
    this.loaderService.showLoader();
    this.schedulerService.getScreensForTenant().subscribe(
      data => {
        this.screenCards = data.screens;
        this.showAPILoader = false;
        this.loaderService.hideLoader();
      },
      error => {
        console.error('Error fetching screens:', error);
        this.showAPILoader = true;
        this.loaderService.hideLoader();
      }
    );
  }

  openImageDialog(card: any): void {
    this.dialog.open(ImageCardsListComponent, {
      width: '80%',
      data: { images: card.imageUrls }
    });
  }


  updateScheduler(): void {
    if (this.updateSchedulerForm.invalid) {
      return;
    }

    const schedulerId = this.route.snapshot.paramMap.get('id');
    const formData = this.updateSchedulerForm.value;
    const formattedStartDate = this.datePipe.transform(formData.dateRange.startDate, 'dd-MM-yyyy');
    const formattedEndDate = this.datePipe.transform(formData.dateRange.endDate, 'dd-MM-yyyy');

    const schedulerData = {
      ...formData,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    };

    this.schedulerService.updateScheduler(schedulerId!, schedulerData).subscribe(
      () => {
        this.notificationService.showNotification(
          'Scheduler updated successfully',
          'success'
        );
        this.router.navigate(['/schedulers']);
      },
      error => {
        console.error('Error updating scheduler:', error);
        this.notificationService.showNotification(
          'Error creating scheduler',
          'error'
        );
      }
    );
  }

  receiveSelectedVideos(selectedVideos: any[]): void {
    this.selectedVideos = selectedVideos;
    this.updateSchedulerForm.patchValue({ selectedVideos: this.selectedVideos });
    const totalSlots = (this.updateSchedulerForm.value.cycleTime * 60) / this.updateSchedulerForm.value.slotSize;
    if (selectedVideos.length > totalSlots) {
      this.notificationService.showNotification(
        'Selected number of videos exceeds slot size',
        'error'
      );
    }
  }

  toggleScreenSelection(screenId: string, checked: boolean): void {
    if (checked) {
      if (!this.selectedScreenIds.includes(screenId)) {
        this.selectedScreenIds.push(screenId);
      }
    } else {
      this.selectedScreenIds = this.selectedScreenIds.filter(id => id !== screenId);
    }
    this.updateSchedulerForm.patchValue({ selectedScreenIds: this.selectedScreenIds });
  }
  

  dateFilter = function (a: Date | null): boolean {
    const today = new Date();
    if (a) {
      const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const formattedDate = new Date(a.getFullYear(), a.getMonth(), a.getDate());

      return formattedDate >= formattedToday; // Enable dates equal to or greater than today
    }
    return false;
  };

  addVideo(video: Video): void {
    this.selectedVideos.push(video);
    this.updateSchedulerForm.patchValue({ selectedVideos: this.selectedVideos });
  }

  removeVideo(video: Video): void {
    this.selectedVideos = this.selectedVideos.filter(v => v.id !== video.id);
    this.updateSchedulerForm.patchValue({ selectedVideos: this.selectedVideos });
  }

  addScreen(screenId: string): void {
    this.selectedScreenIds.push(screenId);
    this.updateSchedulerForm.patchValue({ selectedScreenIds: this.selectedScreenIds });
  }

  removeScreen(screenId: string): void {
    this.selectedScreenIds = this.selectedScreenIds.filter(id => id !== screenId);
    this.updateSchedulerForm.patchValue({ selectedScreenIds: this.selectedScreenIds });
  }

  isSelected(screenId: string): boolean {
    return Array.isArray(this.selectedScreenIds) && this.selectedScreenIds.includes(screenId);
  }
}
