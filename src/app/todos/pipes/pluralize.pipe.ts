import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
})
export class PluralizePipe implements PipeTransform {
  transform(value: string, count: number | null): string {
    return count === 1 ? value : `${value}s`;
  }
}
