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
import { CampaignSettingsComponent } from './campaign-settings/campaign-settings.component';
import { CustomerNameSettingsComponent } from './customer-name-settings/customer-name-settings.component';
import { CategoryOptionSettingsComponent } from './category-option-settings/category-option-settings.component';
import { ExtraSlotSizeSettingsComponent } from './extra-slot-size-settings/extra-slot-size-settings.component';
import { ScreenSettingsComponent } from './screen/screen-settings/screen-settings.component';
import { CityNameComponent } from './screen/city-name/city-name.component';
import { ScreenCategoryComponent } from './screen/screen-category/screen-category.component';
import { ScreenNetworkComponent } from './screen/screen-network/screen-network.component';
import { StateComponent } from './screen/state/state.component'; 
import { QuoteSettingsComponent } from './quote-settings/quote-settings.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { MediaIdentityComponent } from './media-identity/media-identity.component';
import { PublicCaseSettingsComponent } from './publicCase/public-case-settings/public-case-settings.component';
import { CaseTypesComponent } from './publicCase/case-types/case-types.component';
import { CaseStatusComponent } from './publicCase/case-status/case-status.component';


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
 EditSchedulerDialogComponent,
 CampaignSettingsComponent,
 CustomerNameSettingsComponent,
 CategoryOptionSettingsComponent,
 ExtraSlotSizeSettingsComponent,
 ScreenSettingsComponent,
 CityNameComponent,
 ScreenCategoryComponent,
 ScreenNetworkComponent,
 StateComponent,
 QuoteSettingsComponent,
 TermsConditionsComponent,
 MediaIdentityComponent,
 PublicCaseSettingsComponent,
 CaseTypesComponent,
 CaseStatusComponent,
 

  ],
  imports: [CommonModule, MaterialModule, SettingsRoutingModule, FormsModule,],
  providers: [],
  exports: [SettingsComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class SettingsModule {}