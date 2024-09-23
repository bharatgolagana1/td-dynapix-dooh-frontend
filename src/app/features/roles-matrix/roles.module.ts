import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesMatrixComponent } from './components/roles-matrix/roles-matrix.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingModule } from './roles-routing.module';
import { FilterByModulePipe, CountByModulePipe } from './filter-tasks.pipe';
import { RoleComponent } from './components/role/role.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ModuleComponent } from './components/module/module.component';

@NgModule({
  declarations: [RolesMatrixComponent, FilterByModulePipe, CountByModulePipe, RoleComponent, TasksComponent, ModuleComponent],
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
