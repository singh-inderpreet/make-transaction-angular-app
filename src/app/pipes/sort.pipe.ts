import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  transform(array: any, fieldName: any): any {
    if (array?.length) {
      array.sort((a: any, b: any) => {
        let date1: Date = new Date(a[fieldName]);
        let date2: Date = new Date(b[fieldName]);
        if (date1 < date2) {
          return -1;
        } else if (date1 > date2) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return array;
  }
}
