import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListScreenComponent } from './components/list-screen/list-screen.component';
import { CreateScreenComponent } from './components/create-screen/create-screen.component';
import { UpdateScreenComponent } from './components/update-screen/update-screen.component';

const routes: Routes = [
  {
    path: '',
    component: ListScreenComponent,
    },
  {
    path: 'createScreens',
    component: CreateScreenComponent,
  },
  {
    path: 'updateScreen/:id',
    component: UpdateScreenComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class ScreenRoutingModule { 
  static components = [];
  colors: string[] = ['#EEF0FA', '#F8EEE2', '#DDF0F1', '#FBEAEA'];
}
