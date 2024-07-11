import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { ListBookingComponent } from './components/list-booking/list-booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [CreateBookingComponent, ListBookingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BookingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    MatTooltipModule,
  ],
  exports: [CreateBookingComponent],
})
export class BookingModule {}
