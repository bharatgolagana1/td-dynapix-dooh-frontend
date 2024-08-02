import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { UploadMediaComponent } from './components/upload-media/upload-media.component';
import { ListMediaComponent } from './components/list-media/list-media.component';
import { MediaRoutingModule } from './media-routing.module';
import { UploadSuccessDialogComponent } from './components/upload-success-dialog/upload-success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListMediaDeleteComponent } from './components/list-media-delete/list-media-delete.component';
import { ListMediaVideoDialogComponent } from './components/list-media-video-dialog/list-media-video-dialog.component';
import { ListFilterComponent } from './components/list-filter/list-filter.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    UploadMediaComponent,
    ListMediaComponent,
    UploadSuccessDialogComponent,
    ListMediaDeleteComponent,
    ListMediaVideoDialogComponent,
    ListFilterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MediaRoutingModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
  ],
  providers: [],
  exports: [ListMediaComponent, UploadMediaComponent],
})
export class MediaModule {}
