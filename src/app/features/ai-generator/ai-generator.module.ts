import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGeneratorComponent } from './components/image-generator/image-generator.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AIGeneratorRoutingModule } from './ai-generator-routing.module';

@NgModule({
  declarations: [ImageGeneratorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    AIGeneratorRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [ImageGeneratorComponent],
})
export class AiGeneratorModule {}
