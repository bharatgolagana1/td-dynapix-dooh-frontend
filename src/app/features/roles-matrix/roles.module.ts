import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesMatrixComponent } from './components/roles-matrix/roles-matrix.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingModule } from './roles-routing.module';
import { FilterByModulePipe, CountByModulePipe } from './filter-tasks.pipe';

@NgModule({
  declarations: [RolesMatrixComponent, FilterByModulePipe, CountByModulePipe],
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
