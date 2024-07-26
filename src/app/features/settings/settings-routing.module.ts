import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { BookingSettingsComponent } from './booking-settings/booking-settings.component';
import { PlaylistSettingsComponent } from './playlist-settings/playlist-settings.component';


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
        path: 'bookingSettings',
        component: BookingSettingsComponent,
      },

      {
        path: 'playlistSettings',
        component: PlaylistSettingsComponent,
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
