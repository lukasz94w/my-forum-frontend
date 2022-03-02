import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'singularPlural'
})
export class SingularPluralPipe implements PipeTransform {
  transform(phrase: string, numberOfItems: number): string {
    return numberOfItems != 1 ? phrase + 's' : phrase;
  }
}
