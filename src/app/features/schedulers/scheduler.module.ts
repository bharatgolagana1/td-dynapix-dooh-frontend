import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSchedulerComponent } from './components/create-scheduler/create-scheduler.component';
import { ListSchedulerComponent } from './components/list-scheduler/list-scheduler.component';
import { MaterialModule } from 'src/app/material.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';

@NgModule({
  declarations: [
    CreateSchedulerComponent,
    ListSchedulerComponent
  ],
  imports: [CommonModule, MaterialModule,SchedulerRoutingModule],
  exports: [CreateSchedulerComponent, ListSchedulerComponent,],
})
export class SchedulerModule {}