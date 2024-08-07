import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMediaComponent } from './components/list-media/list-media.component';
import { DefaultMediaComponent } from '../manage-default-media/components/default-media/default-media.component';

const routes: Routes = [
  {
    path: '',
    component: ListMediaComponent,
  },

  {
    path: 'uploa-default-dmedia',
    component: DefaultMediaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaRoutingModule {
  static components = [];
  colors: string[] = ['#eef0fa', '#f8eee2', '#ddf0f1', '#fbeaea'];
}
