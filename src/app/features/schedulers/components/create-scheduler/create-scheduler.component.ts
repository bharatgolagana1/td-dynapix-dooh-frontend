import { Component } from '@angular/core';
import { SchedulerService } from '../scheduler.service';
import {FormArray, FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Video } from '../video-thumbnails-list/video-thumbnails-list.component';
@Component({
  selector: 'app-create-scheduler',
  templateUrl: './create-scheduler.component.html',
  styleUrls: ['./create-scheduler.component.scss']
})
export class CreateSchedulerComponent {
  cycleTime: number = 0;
  slotSize: number = 0;
  screenIds = '';
  videoUrls: string = '';

  selectedCycleTime!: string;
  selectedSlotSize!: string;

  isSubmitting: boolean = false;
  selectedVideos: string[] | Video[] = [];
  selectedScreenIds= [];

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
      selected: false
    },

    {
      id: '2',
      title: '4 Road Junction',
      screen: 'scheduler',
      location: '1995 Marathali, Bangalore',
      size: 'Size: 30*20',
      sft: 'SFT: 600',
      availability: 'Next Available Date: 12th July 2023',
      selected: false
    },

    {
      id: '3',
      title: '4 Road Junction',
      screen: 'scheduler',
      location: '1995 Marathali, Bangalore',
      size: 'Size: 30*20',
      sft: 'SFT: 600',
      availability: 'Next Available Date: 12th July 2023',
      selected: false
    },

    {
      id: '4',
      title: '4 Road Junction',
      screen: 'scheduler',
      location: '1995 Marathali, Bangalore',
      size: 'Size: 30*20',
      sft: 'SFT: 600',
      availability: 'Next Available Date: 12th July 2023',
      selected: false
    },
   
  ];

  toggleCheckbox(card: any) {
    card.selected = !card.selected;
  }



  toggleScreenSelection(screenId: string, checked: boolean): void {
    const selectedScreenIds = this.createSchedulerForm.get('selectedScreenIds') as FormArray;

    if (checked) {
      selectedScreenIds.push(this.formBuilder.control(screenId));
    } else {
      const index = selectedScreenIds.controls.findIndex(x => x.value === screenId);
      selectedScreenIds.removeAt(index);
    }
  }



  createScheduler() {
    const schedulerData = {
      cycleTime: this.cycleTime,
      slotSize: this.slotSize,
      screenIds: this.screenIds.split(',').map(id => id.trim()),
      videoUrls: this.videoUrls.split(',').map(url => url.trim())
    };

    this.schedulerService.createScheduler(schedulerData)
      .subscribe(
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

  createSchedulerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private schedulerService: SchedulerService) {
    this.createSchedulerForm=this.formBuilder.group({
      cycleTime:['',[Validators.required]],
      slotSize:['',[Validators.required]],
      selectedVideos: [[],[Validators.required] ],
      selectedScreenIds: this.formBuilder.array([])
    })
  }


  receiveSelectedVideos(selectedVideos:Video[]| string[]): void {
    this.selectedVideos = selectedVideos;
    // Update the form control value
    this.createSchedulerForm.patchValue({
      selectedVideos: this.selectedVideos
    });
  }
  createSchedulers(): void {
    if (this.createSchedulerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Log the form data
      console.log('Form Data:', this.createSchedulerForm.value);

      this.schedulerService.createScheduler(this.createSchedulerForm.value)
        .subscribe(
          (response) => {
            console.log('Scheduler created successfully:', response);
            // Optionally, reset form fields or perform other actions upon success
            this.isSubmitting = false;
          },
          (error) => {
            console.error('Error creating scheduler:', error);
            // Optionally, display an error message to the user
            this.isSubmitting = false;
          }
        );
    } else {
      // Handle form validation errors or submission in progress
    }
  }
  }

  

  
  

