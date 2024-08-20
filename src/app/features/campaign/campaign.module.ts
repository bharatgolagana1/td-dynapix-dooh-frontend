import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';

import { UploadMediaDialogComponent } from './components/upload-media-dialog/upload-media-dialog.component';
import { CampaignUploadMediaComponent } from './components/campaign-upload-media/campaign-upload-media.component';
import { MaterialModule } from 'src/app/material.module';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampaignRoutingModule } from './campaign-routing.module';

@NgModule({
  declarations: [
    CreateCampaignComponent,
    UploadMediaDialogComponent,
    CampaignUploadMediaComponent,
    CampaignListComponent,
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
