import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { ListBookingComponent } from './components/list-booking/list-booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MaterialModule } from 'src/app/material.module';
import { MediaModule } from '../media/media.module';
import { EditBookingComponent } from './components/edit-booking/edit-booking.component';
@NgModule({
  declarations: [CreateBookingComponent, ListBookingComponent, EditBookingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BookingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    MatTooltipModule,
    MediaModule
],
  exports: [CreateBookingComponent,ListBookingComponent],
})
export class BookingModule {}
