import { Component } from '@angular/core';
import { SchedulerService } from '../scheduler.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../video-thumbnails-list/video-thumbnails-list.component';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
  selector: 'app-create-scheduler',
  templateUrl: './create-scheduler.component.html',
  styleUrls: ['./create-scheduler.component.scss'],
})
export class CreateSchedulerComponent {
  cycleTime: number = 0;
  slotSize: number = 0;
  screenIds: number = 0;
  videoUrls: string = '';
  selectedCycleTime!: string;
  selectedSlotSize!: string;
  isSubmitting: boolean = false;
  selectedVideos: string[] | Video[] = [];
  selectedScreenIds = [];
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
  screenCards = [
    {
      id: '1',
      title: '4 Road Junction',
      screen: 'scheduler',
      location: '1995 Marathali, Bangalore',
      size: 'Size: 30*20',
      sft: 'SFT: 600',
      availability: 'Next Available Date: 12th July 2023',
      selected: false,
    },
    {
      id: '2',
      title: 'Arya Nagar Road, Kanpur',
      screen: 'scheduler',
      location: '8/10 Arya Nagar Kanpur',
      size: 'Size: 20*20',
      sft: 'SFT: 400',
      availability: 'Next Available Date: 29th July 2023',
      selected: false,
    },
    {
      id: '3',
      title: 'Beach Road, Vizag',
      screen: 'scheduler',
      location: 'vikas nagar, Vizag',
      size: 'Size: 30*20',
      sft: 'SFT: 600',
      availability: 'Next Available Date: 15th July 2023',
      selected: false,
    },
    {
      id: '4',
      title: 'Gajuwaka Junction',
      screen: 'scheduler',
      location: 'Oldgajuwaka, Andhrapradesh',
      size: 'Size: 30*20',
      sft: 'SFT: 600',
      availability: 'Next Available Date: 19th July 2023',
      selected: false,
    },
  ];
  toggleCheckbox(card: any) {
    card.selected = !card.selected;
  }
  toggleScreenSelection(screenId: string, checked: boolean): void {
    const selectedScreenIds = this.createSchedulerForm.get(
      'selectedScreenIds'
    ) as FormArray;
    if (checked) {
      selectedScreenIds.push(this.formBuilder.control(screenId));
    } else {
      const index = selectedScreenIds.controls.findIndex(
        (x) => x.value === screenId
      );
      selectedScreenIds.removeAt(index);
    }
  }
  createScheduler() {
    const schedulerData = {
      cycleTime: this.cycleTime,
      slotSize: this.slotSize,
      screenIds: this.screenIds,
      videoUrls: this.videoUrls.split(',').map((url) => url.trim()),
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
    private router: Router
  ) {
    this.createSchedulerForm = this.formBuilder.group({
      cycleTime: ['', [Validators.required]],
      slotSize: ['', [Validators.required]],
      selectedVideos: [[], [Validators.required]],
      selectedScreenIds: this.formBuilder.array([]),
    });
  }
  receiveSelectedVideos(selectedVideos: any[]): void {
    // Map the received video objects to extract only the video URLs
    this.selectedVideos = selectedVideos.map((video) => video);
    // Update the form control value
    this.createSchedulerForm.patchValue({
      selectedVideos: this.selectedVideos,
    });
    // Check if the selected number of videos exceeds slot size
    const selectedVideosCount = this.selectedVideos.length;
    const slotSize = this.createSchedulerForm.value.slotSize;
    const cycleTime = this.createSchedulerForm.value.cycleTime;
    const totalSlots = (cycleTime * 60) / slotSize;

    // Check if the number of videos matches the number of slots
    if (selectedVideosCount > totalSlots) {
      this.notificationService.showNotification(
        'Selected number of videos exceeds slot size',
        'error'
      );
    }
  }
  createSchedulers(): void {
    if (this.createSchedulerForm.valid && !this.isSubmitting) {
      const selectedVideosCount =
        this.createSchedulerForm.value.selectedVideos.length;
      const slotSize = this.createSchedulerForm.value.slotSize;
      const cycleTime = this.createSchedulerForm.value.cycleTime;
      if (
        selectedVideosCount > slotSize ||
        selectedVideosCount % cycleTime !== 0
      ) {
        // Notify user about the mismatch
        this.notificationService.showNotification(
          'Selected number of videos does not match slot size or cycle time',
          'error'
        );
        return;
      }
      const selectedVideos = this.selectedVideos.map((video: any) => {
        return {
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
        };
      });
      const schedulerData = {
        cycleTime: this.createSchedulerForm.value.cycleTime,
        slotSize: this.createSchedulerForm.value.slotSize,
        screenIds: this.createSchedulerForm.value.selectedScreenIds,
        selectedVideos,
      };
      this.isSubmitting = true;
      // Log the form data
      console.log('Form Data:', this.createSchedulerForm.value);
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
