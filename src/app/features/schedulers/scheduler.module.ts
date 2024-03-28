import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSchedulerComponent } from './components/create-scheduler/create-scheduler.component';
import { ListSchedulerComponent } from './components/list-scheduler/list-scheduler.component';
import { MaterialModule } from 'src/app/material.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { VideoThumbnailsListComponent } from './components/video-thumbnails-list/video-thumbnails-list.component';
import { ImageCardsListComponent } from './components/image-cards-list/image-cards-list.component';
import { SchedulerFormComponentComponent } from './components/scheduler-form-component/scheduler-form-component.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    CreateSchedulerComponent,
    ListSchedulerComponent,
    VideoThumbnailsListComponent,
    ImageCardsListComponent,
    SchedulerFormComponentComponent,
    VideoDialogComponent
  ],
  imports: [CommonModule, MaterialModule,SchedulerRoutingModule,FormsModule,ReactiveFormsModule ],
  exports: [CreateSchedulerComponent, ListSchedulerComponent,VideoDialogComponent],
 
})
export class SchedulerModule {}