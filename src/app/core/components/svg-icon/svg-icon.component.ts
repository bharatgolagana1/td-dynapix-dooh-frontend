import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  template: `<img
    [src]="getImageSource()"
    [style.width]="width"
    [style.height]="height"
    [style.fill]="color"
  />`,
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent {
  @Input() iconName!: string;
  @Input() color?: string;
  @Input() width: string = '20px';
  @Input() height: string = '20px';
  @Input() format: string = 'svg';

  getImageSource(): string {
    return `assets/icons/${this.iconName}.${this.format}`;
  }
}
