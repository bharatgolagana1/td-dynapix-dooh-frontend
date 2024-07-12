import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateScreenComponent } from './components/create-screen/create-screen.component';
import { ListScreenComponent } from './components/list-screen/list-screen.component';
import { ScreenRoutingModule } from './screen-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UpdateScreenComponent } from './components/update-screen/update-screen.component';
import { DeleteScreenListComponent } from './components/delete-screen-list/delete-screen-list.component';
import { ScreensListComponent } from './components/screens-list/screens-list.component';
import { CustomDatePipe } from 'src/app/core/services/custom-date.pipe';
import { StatusConfirmDailogComponent } from './components/status-confirm-dailog/status-confirm-dailog.component';
import { DateRangeDialogComponent } from './components/date-range-dialog/date-range-dialog.component';
import { BindDeviceComponent } from './components/bind-device/bind-device.component';

@NgModule({
  declarations: [
    CreateScreenComponent,
    ListScreenComponent,
    ImageDialogComponent,
    UpdateScreenComponent,
    DeleteScreenListComponent,
    ScreensListComponent,
    CustomDatePipe,
    StatusConfirmDailogComponent,
    DateRangeDialogComponent,
    BindDeviceComponent 
  ],
  imports: [
    CommonModule,
    ScreenRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule,
  ],
  exports:[CreateScreenComponent,ListScreenComponent]
})
export class ScreenModule { }
