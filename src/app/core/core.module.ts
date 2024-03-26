import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
// import { MaterialModule } from '../material/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, SvgIconComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [LoadingSpinnerComponent, SvgIconComponent],
})
export class CoreModule {}
