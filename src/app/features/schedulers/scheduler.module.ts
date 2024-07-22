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
import { ReactiveFormsModule } from '@angular/forms';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { PlaySchedulerComponent } from './components/play-scheduler/play-scheduler.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SchedulerDeleteComponent } from './components/scheduler-delete/scheduler-delete.component';
import { DeleteScreenComponent } from './components/delete-screen/delete-screen.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdateSchedulerComponent } from './components/update-scheduler/update-scheduler.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    CreateSchedulerComponent,
    ListSchedulerComponent,
    VideoThumbnailsListComponent,
    ImageCardsListComponent,
    SchedulerFormComponentComponent,
    VideoDialogComponent,
    PlaySchedulerComponent,
    SchedulerDeleteComponent,
    DeleteScreenComponent,
    UpdateSchedulerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SchedulerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    MatTooltipModule,
  ],
  exports: [
    CreateSchedulerComponent,
    ListSchedulerComponent,
    VideoDialogComponent,
  ],
  providers: [DatePipe],
})
export class SchedulerModule {}
