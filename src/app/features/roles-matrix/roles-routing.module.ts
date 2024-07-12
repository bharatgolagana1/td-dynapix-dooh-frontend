import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesMatrixComponent } from './components/roles-matrix/roles-matrix.component';

const routes: Routes = [
  {
    path: '',
    component: RolesMatrixComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {
  static components = [];
  colors: string[] = ['#eef0fa', '#f8eee2', '#ddf0f1', '#fbeaea'];
}
