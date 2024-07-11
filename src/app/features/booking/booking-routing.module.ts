import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { ListBookingComponent } from './components/list-booking/list-booking.component';

const routes: Routes = [
  {
    path: '',
    component: ListBookingComponent,
  },

  {
    path: 'create-booking',
    component: CreateBookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {
  static components = [];
  colors: string[] = ['#eef0fa', '#f8eee2', '#ddf0f1', '#fbeaea'];
}
