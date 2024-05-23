import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateScreenComponent } from './components/create-screen/create-screen.component';
import { ListScreenComponent } from './components/list-screen/list-screen.component';
import { ScreenRoutingModule } from './screen-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UpdateScreenComponent } from './components/update-screen/update-screen.component';


@NgModule({
  declarations: [
    CreateScreenComponent,
    ListScreenComponent,
    ImageDialogComponent,
    UpdateScreenComponent
  ],
  imports: [
    CommonModule,
    ScreenRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SlickCarouselModule,
  ],
  exports:[CreateScreenComponent,ListScreenComponent]
})
export class ScreenModule { }
