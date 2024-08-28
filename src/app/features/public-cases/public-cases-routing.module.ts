import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicCaseComponent } from './components/public-case/public-case.component';
import { SuccessfulSubmissionComponent } from './components/successful-submission/successful-submission.component';
import { PublicCasesListComponent } from './components/public-cases-list/public-cases-list.component';

const routes: Routes = [

      {
        path: 'public-case-list',
        component: PublicCasesListComponent,
      },

     {
        path: 'public-case',
        component: PublicCaseComponent,
      },

      {
        path: 'successful-submission',
        component: SuccessfulSubmissionComponent,
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicCasesRoutingModule { }
