import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SettingsComponent } from './settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { BookingSettingsComponent } from './booking-settings/booking-settings.component';
import { PlaylistSettingsComponent } from './playlist-settings/playlist-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserIdentificationTypeComponent } from './user-identification-type/user-identification-type.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SchedulerSettingsComponent } from './scheduler-settings/scheduler-settings.component';
import { SchedulerSlotSettingsComponent } from './scheduler-slot-settings/scheduler-slot-settings.component';
import { EditSchedulerDialogComponent } from './edit-scheduler-dialog/edit-scheduler-dialog.component'; 

@NgModule({
  declarations: [
 SettingsComponent,
 UserSettingsComponent,
 BookingSettingsComponent,
 PlaylistSettingsComponent,
 UserRoleComponent,
 UserProfileComponent,
 UserIdentificationTypeComponent,
 DeleteDialogComponent,
 SchedulerSettingsComponent,
 SchedulerSlotSettingsComponent,
 EditSchedulerDialogComponent
  ],
  imports: [CommonModule, MaterialModule, SettingsRoutingModule, FormsModule,],
  providers: [],
  exports: [SettingsComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class SettingsModule {}