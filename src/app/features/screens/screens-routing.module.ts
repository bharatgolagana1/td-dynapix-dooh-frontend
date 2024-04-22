import { NgModule, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateScreensComponent } from './components/create-screens/create-screens.component';
import { ScreensComponent } from './components/screens/screens.component';
const routes: Routes = [
  {
    path: '',
    component: ScreensComponent,
    },
  {
    path: 'createScreens',
    component: CreateScreensComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreensRoutingModule {
  static components = [];
  colors: string[] = ['#EEF0FA', '#F8EEE2', '#DDF0F1', '#FBEAEA'];
 }