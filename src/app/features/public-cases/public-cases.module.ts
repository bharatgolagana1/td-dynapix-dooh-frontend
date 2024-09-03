import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicCaseComponent } from './components/public-case/public-case.component';
import { SuccessfulSubmissionComponent } from './components/successful-submission/successful-submission.component';
import { PublicCasesRoutingModule } from './public-cases-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PublicCasesListComponent } from './components/public-cases-list/public-cases-list.component';
import { DeleteDialogPublicCaseComponent } from './components/delete-dialog-public-case/delete-dialog-public-case.component';
import { ImageDialogPublicCaseComponent } from './components/image-dialog-public-case/image-dialog-public-case.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    PublicCaseComponent,
    SuccessfulSubmissionComponent,
    PublicCasesListComponent,
    DeleteDialogPublicCaseComponent,
    ImageDialogPublicCaseComponent
  ],
  imports: [
    CommonModule,
    PublicCasesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    SlickCarouselModule,
  ]
})
export class PublicCasesModule { }
