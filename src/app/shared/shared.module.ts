import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, MaterialModule],
  exports: [FileUploadComponent],
})
export class SharedModule {}
