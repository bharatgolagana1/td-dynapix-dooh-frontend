import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    CreateUserComponent,
    ListUserComponent
  ],
  imports: [CommonModule, MaterialModule,UsersRoutingModule],
  exports: [ CreateUserComponent ,ListUserComponent],
})
export class UsersModule {}
