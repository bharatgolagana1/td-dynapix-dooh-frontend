import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignUploadMediaComponent } from './components/campaign-upload-media/campaign-upload-media.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { PlayMediaComponent } from './components/play-media/play-media.component';

const routes: Routes = [
  { path: '', component: CampaignListComponent },
  {
    path: ':campaignId/uploadmedia',
    component: CampaignUploadMediaComponent,
  },
  { path: 'create-campaign', component: CreateCampaignComponent },
  { path: 'play-media', component: PlayMediaComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignRoutingModule {
  static components = [];
  colors: string[] = ['#eef0fa', '#f8eee2', '#ddf0f1', '#fbeaea'];
}
