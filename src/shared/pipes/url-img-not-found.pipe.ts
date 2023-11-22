import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(value: string | string[], defaultImage: string): string {
    if (Array.isArray(value)) {
      return value.length > 0 ? value[0] : defaultImage;
    }
    return value || defaultImage;
  }
}
