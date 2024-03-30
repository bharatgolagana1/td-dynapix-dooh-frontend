import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadMediaComponent } from './components/upload-media/upload-media.component';
import { ListMediaComponent } from './components/list-media/list-media.component';

const routes: Routes = [
    {
        path: '',
        component: ListMediaComponent,
      },
  
    {
    path: 'uploadmedia',
    component: UploadMediaComponent,
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
