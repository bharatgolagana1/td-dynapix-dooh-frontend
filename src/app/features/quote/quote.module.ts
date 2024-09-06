import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteRoutingModule } from './quote-routing.module';
import { ListQuoteComponent } from './components/list-quote/list-quote.component';
import { CreateQuoteComponent } from './components/create-quote/create-quote.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteQuoteComponent } from './components/delete-quote/delete-quote.component';
import { EditQuoteComponent } from './components/edit-quote/edit-quote.component';
@NgModule({
  declarations: [
    CreateQuoteComponent,
    ListQuoteComponent,
    DeleteQuoteComponent,
    EditQuoteComponent
   
  ],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class QuoteModule { }
