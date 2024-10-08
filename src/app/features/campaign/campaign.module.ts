import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';

import { UploadMediaDialogComponent } from './components/upload-media-dialog/upload-media-dialog.component';
import { CampaignUploadMediaComponent } from './components/campaign-upload-media/campaign-upload-media.component';
import { MaterialModule } from 'src/app/material.module';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampaignRoutingModule } from './campaign-routing.module';
import { PlayMediaComponent } from './components/play-media/play-media.component';
import { DateRangePickerDialogComponent } from './date-range-picker-dialog/date-range-picker-dialog.component';
import { ApproveConfirmationDailogComponent } from './components/approve-confirmation-dailog/approve-confirmation-dailog.component';

@NgModule({
  declarations: [
    CreateCampaignComponent,
    UploadMediaDialogComponent,
    CampaignUploadMediaComponent,
    CampaignListComponent,
    PlayMediaComponent,
    DateRangePickerDialogComponent,
    ApproveConfirmationDailogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CampaignRoutingModule,
  ],
})
export class CampaignModule {}
