import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesMatrixComponent } from './components/roles-matrix/roles-matrix.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTasksPipe } from './filter-tasks.pipe';
import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
  declarations: [RolesMatrixComponent, FilterTasksPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RolesRoutingModule,
  ],
  exports: [RolesMatrixComponent],
})
export class RolesModule {}
