import { Component } from '@angular/core';
import { SchedulerService } from '../scheduler.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
@Component({
  selector: 'app-create-scheduler',
  templateUrl: './create-scheduler.component.html',
  styleUrls: ['./create-scheduler.component.scss']
})
export class CreateSchedulerComponent {
  cycleTime: number = 0;
  slotSize: number = 0;
  screenIds: string = '';
  videoUrls: string = '';

  selectedCycleTime!: string;
  selectedSlotSize!: string;

  option1 = [
    { label: '1', value: 'option1' },
    { label: '2', value: 'option2' },
    { label: '3', value: 'option3' },
    { label: '4', value: 'option4' },
  ];

  option2 = [
    { label: '1', value: 'option1' },
    { label: '2', value: 'option2' },
    { label: '3', value: 'option3' },
    { label: '4', value: 'option4' },
  ];

  examplecards = [
    {
      title: '4 Road Junction',
      screen: 'scheduler',
      location: '1995 Marathali, Bangalore',
      size: 'Size: 30*20',
      sft: 'SFT: 600',
      availability: 'Next Available Date: 12th July 2023',
      selected: false
    },

    {
      title: '4 Road Junction',
      screen: 'scheduler',
      location: '1995 Marathali, Bangalore',
      size: 'Size: 30*20',
      sft: 'SFT: 600',
      availability: 'Next Available Date: 12th July 2023',
      selected: false
    },

    {
      title: '4 Road Junction',
      screen: 'scheduler',
      location: '1995 Marathali, Bangalore',
      size: 'Size: 30*20',
      sft: 'SFT: 600',
      availability: 'Next Available Date: 12th July 2023',
      selected: false
    },

    {
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
      slotSize:['',[Validators.required]]
    })
  }

  
  
}
