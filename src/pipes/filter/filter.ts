import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(list: {}[], field: string, value: string) {
    if (!value) return list;

    return list.filter(obj => {
      if (obj.hasOwnProperty(field))
        return obj[field].includes(value)
      else
        console.error('Gênio mudou o nome da variavel');
    });
  }
}
