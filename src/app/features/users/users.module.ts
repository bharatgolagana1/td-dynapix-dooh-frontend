import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { UsersRoutingModule } from './users-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
@NgModule({
  declarations: [
    CreateUserComponent,
    ListUserComponent,
    DeleteConfirmationDialogComponent,
    EditUserDialogComponent
  ],
  imports: [CommonModule, MaterialModule,UsersRoutingModule,ReactiveFormsModule,FormsModule, HttpClientModule  ],
  providers: [UserService],
  exports: [ CreateUserComponent ,ListUserComponent],
})
export class UsersModule {}
