import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuoteComponent } from './components/create-quote/create-quote.component';
import { ListQuoteComponent } from './components/list-quote/list-quote.component';
import { EditQuoteComponent } from './components/edit-quote/edit-quote.component';


const routes: Routes = [
  {
    path: '',
    component: ListQuoteComponent
  },
  {
    path: 'create-quote',
    component: CreateQuoteComponent
  },
  {
    path: ':quoteId/editquote',
    component: EditQuoteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule {
  static components = [];
  colors: string[] = ['#eef0fa', '#f8eee2', '#ddf0f1', '#fbeaea'];
 }
