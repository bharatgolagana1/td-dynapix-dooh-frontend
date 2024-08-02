import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultMediaComponent } from '../manage-default-media/components/default-media/default-media.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultMediaComponent,
  },

  {
    path: 'upload-default-dmedia',
    component: DefaultMediaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultMediaRoutingModule {
  static components = [];
  colors: string[] = ['#eef0fa', '#f8eee2', '#ddf0f1', '#fbeaea'];
}
