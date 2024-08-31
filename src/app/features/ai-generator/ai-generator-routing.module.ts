import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageGeneratorComponent } from './components/image-generator/image-generator.component';

const routes: Routes = [
  {
    path: '',
    component: ImageGeneratorComponent,
  },
  {
    path: 'generate-image',
    component: ImageGeneratorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AIGeneratorRoutingModule {
  static components = [];
  colors: string[] = ['#eef0fa', '#f8eee2', '#ddf0f1', '#fbeaea'];
}
