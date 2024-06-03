import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSchedulerComponent } from './components/create-scheduler/create-scheduler.component';
import { ListSchedulerComponent } from './components/list-scheduler/list-scheduler.component';
import { PlaySchedulerComponent } from './components/play-scheduler/play-scheduler.component';
import { UpdateSchedulerComponent } from './components/update-scheduler/update-scheduler.component';

const routes: Routes = [

    {
      path: '',
      component: ListSchedulerComponent,
      },
    {
      path: 'createScheduler',
      component: CreateSchedulerComponent,
    },
    {
      path: 'playScheduler',
      component: PlaySchedulerComponent,
    },
    { path: 'updateScheduler/:id', component: UpdateSchedulerComponent },
  ];

  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulerRoutingModule {
  static components = [];
  colors: string[] = ['#eef0fa', '#f8eee2', '#ddf0f1', '#fbeaea'];
}