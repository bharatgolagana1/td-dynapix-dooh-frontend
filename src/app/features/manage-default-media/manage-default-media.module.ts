import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultMediaComponent } from './components/default-media/default-media.component';
import { DefaultMediaRoutingModule } from './default-media-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadComponent } from 'src/app/shared/file-upload/file-upload.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DefaultMediaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DefaultMediaRoutingModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    SharedModule,
  ],
})
export class ManageDefaultMediaModule {}
