import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CampaignService } from '../../campaign.service';

@Component({
  selector: 'app-campaign-upload-media',
  templateUrl: './campaign-upload-media.component.html',
  styleUrls: ['./campaign-upload-media.component.scss'],
})
export class CampaignUploadMediaComponent {
  constructor() {}
}
