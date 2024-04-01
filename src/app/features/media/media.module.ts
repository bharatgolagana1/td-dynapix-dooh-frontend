import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadMediaComponent } from './components/upload-media/upload-media.component';
import { ListMediaComponent } from './components/list-media/list-media.component';
import { MediaRoutingModule } from './media-routing.module';




@NgModule({
  declarations: [UploadMediaComponent,ListMediaComponent
  ],
  imports: [CommonModule, MaterialModule,MediaRoutingModule ],
  providers: [],
  exports: [ ListMediaComponent , UploadMediaComponent, ],
})
export class MediaModule {}
