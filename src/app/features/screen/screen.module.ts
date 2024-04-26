import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateScreenComponent } from './components/create-screen/create-screen.component';
import { ListScreenComponent } from './components/list-screen/list-screen.component';
import { ScreenRoutingModule } from './screen-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateScreenComponent,
    ListScreenComponent
  ],
  imports: [
    CommonModule,
    ScreenRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[CreateScreenComponent,ListScreenComponent]
})
export class ScreenModule { }
