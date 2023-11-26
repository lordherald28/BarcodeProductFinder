import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: string[], searchTerm: string): any {
    if (!searchTerm) {
      return values;
    }
    const normalizedSearchTerm = searchTerm.toLowerCase().replace('&', 'and');
    return values.filter(value => this.isMatch(value, normalizedSearchTerm));
  }

  isMatch(facetValue: string, inputValue: string): boolean {
    const normalizedFacetValue = facetValue.toLowerCase().replace('&', 'and');
    const categories = inputValue.split('>').map(s => s.trim());
    return categories.some(category => normalizedFacetValue.includes(category));
  }
}