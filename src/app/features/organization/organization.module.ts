import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { OrganizationComponent } from './components/organization/organization.component';
import { ListComponent } from './components/list/list.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { DeleteOrganizationComponent } from './components/delete-organization/delete-organization.component';


@NgModule({
  declarations: [
   OrganizationComponent,
   ListComponent,
   DeleteOrganizationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
     MaterialModule,
    OrganizationRoutingModule
  ],
  exports:[OrganizationComponent , ListComponent]
})
export class OrganizationModule { }
