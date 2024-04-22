import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreensRoutingModule } from './screens-routing.module';
import { CreateScreensComponent } from './components/create-screens/create-screens.component';
import { ScreensComponent } from './components/screens/screens.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CreateScreensComponent,
    ScreensComponent,
  ],
  imports: [
    CommonModule,
    ScreensRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports:[CreateScreensComponent,
    ScreensComponent]
})
export class ScreensModule { }