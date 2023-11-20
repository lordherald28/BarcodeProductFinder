import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasUrlImage'
})
export class UrlImgNotFoundPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value)
    return null;
  }

}
