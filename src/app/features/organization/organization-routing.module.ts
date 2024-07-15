import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './components/organization/organization.component';
import { ListComponent } from './components/list/list.component';


const routes: Routes = [
  { path: 'organization', component: OrganizationComponent },
  { path: '', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
