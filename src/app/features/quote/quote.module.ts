import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteRoutingModule } from './quote-routing.module';
import { ListQuoteComponent } from './components/list-quote/list-quote.component';
import { CreateQuoteComponent } from './components/create-quote/create-quote.component';

@NgModule({
  declarations: [
    CreateQuoteComponent,
    ListQuoteComponent
   
  ],
  imports: [
    CommonModule,
    QuoteRoutingModule
  ]
})
export class QuoteModule { }
