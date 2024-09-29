import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentListComponent,
    },
  {
    path:':campaignId/paymentdetails',
    component:PaymentDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
