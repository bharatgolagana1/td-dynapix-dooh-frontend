import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileButtonComponent } from './components/profile-button/profile-button.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { MaterialModule } from 'src/app/material.module';
import { SublinkComponent } from './components/sublink/sublink.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RevenueScreensComponent } from './components/revenue-screens/revenue-screens.component';
import { BookingsHistoryComponent } from './components/bookings-history/bookings-history.component';
import { DigitalChartComponent } from './components/digital-chart/digital-chart.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesComponent } from './components/sales/sales.component';
import { InventoryDetailsComponent } from './components/inventory-details/inventory-details.component';
import { OutstandingPaymentsComponent } from './components/outstanding-payments/outstanding-payments.component';



@NgModule({
  declarations: [
    ProfileButtonComponent,
    DashboardMainComponent,
    SublinkComponent,
    RevenueScreensComponent,
    BookingsHistoryComponent,
    DigitalChartComponent,
    SalesComponent,
    InventoryDetailsComponent,
    OutstandingPaymentsComponent,
  ],
  imports: [CommonModule, MaterialModule, DashboardRoutingModule,MatFormFieldModule,MatSelectModule,MatChipsModule,MatIconModule,ReactiveFormsModule],
  exports: [ProfileButtonComponent, DashboardMainComponent, SublinkComponent],
})
export class DashboardModule {}
