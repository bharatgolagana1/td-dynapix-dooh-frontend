import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TransactionConfirmDailogComponent } from './components/transaction-confirm-dailog/transaction-confirm-dailog.component';
@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentDetailsComponent,
    TransactionConfirmDailogComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule ,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PaymentModule { }
