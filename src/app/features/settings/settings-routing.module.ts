import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { BookingSettingsComponent } from './booking-settings/booking-settings.component';
import { PlaylistSettingsComponent } from './playlist-settings/playlist-settings.component';
import { SchedulerSettingsComponent } from './scheduler-settings/scheduler-settings.component';
import { CampaignSettingsComponent } from './campaign-settings/campaign-settings.component';
import { ScreenSettingsComponent } from './screen/screen-settings/screen-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },

  {
    path: 'userSettings',
    component: UserSettingsComponent,
  },

  {
    path: 'campaignSettings',
    component: CampaignSettingsComponent,
  },

  {
    path: 'playlistSettings',
    component: PlaylistSettingsComponent,
  },
  {
    path: 'schedulerSettings',
    component: SchedulerSettingsComponent,
  },
  {
    path: 'screenSettings',
    component: ScreenSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {
  static components = [];
  colors: string[] = ['#EEF0FA', '#F8EEE2', '#DDF0F1', '#FBEAEA'];
}
