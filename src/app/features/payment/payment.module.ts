import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MaterialModule 
  ]
})
export class PaymentModule { }
