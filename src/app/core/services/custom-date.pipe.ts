import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });

    // Add suffix to the day
    const daySuffix = this.getDaySuffix(day);

    return `${day}${daySuffix} ${month}`;
  }

  private getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // Because 11th, 12th, 13th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
}
