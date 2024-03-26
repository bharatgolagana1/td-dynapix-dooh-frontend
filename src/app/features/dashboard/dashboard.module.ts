import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileButtonComponent } from './components/profile-button/profile-button.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { MaterialModule } from 'src/app/material.module';
import { SublinkComponent } from './components/sublink/sublink.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    ProfileButtonComponent,
    DashboardMainComponent,
    SublinkComponent,
  ],
  imports: [CommonModule, MaterialModule, DashboardRoutingModule],
  exports: [ProfileButtonComponent, DashboardMainComponent, SublinkComponent],
})
export class DashboardModule {}
