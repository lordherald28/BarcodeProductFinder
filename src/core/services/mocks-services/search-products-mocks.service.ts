import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {map} from  'rxjs/operators';

import { ProductMapper } from 'src/core/adapters/product-mapper.mapper';
import { IReponseProductsResult } from 'src/core/entities/producto-entity';
import { SearchParams } from 'src/core/helpers/metadata-products';
import { ProductModel } from 'src/core/models/product.model';

@Injectable()
export class SearchProductsMocksService {

constructor(
  private readonly http : HttpClient
) { }

private mapperProduct = new ProductMapper();
private paramsArray: string[] = [];

getParamsArray() {
  return this.paramsArray;
}

searchProductByKeyword(params: SearchParams): Observable<ProductModel[]> {

  // let proxyUrlForCors: string = 'https://cors-anywhere.herokuapp.com/';
  let url: string = '/assets/json/mocks-response-products.json';


  // url = this.contructionParams(params, url);

  return this.http.get<IReponseProductsResult>(url)
    .pipe(
      map((response) => {
        console.log('response of service: ', response)
        return this.mapperProduct.mapTo(response.products)
      })
    )
}

private contructionParams(params: SearchParams, url: string) {
  if (params.barcode) {
    url += `barcode=${params.barcode}`;
  }

  if (params.search) {
    url += `search=${params.search}`;
  }

  if (params.mpn) {
    url += `&mpn=${params.mpn}`;
  }

  if (params.title) {
    url += `&title=${params.title}`;
  }

  if (params.meta_data.metadata) {
    url += `&metadata=${params.meta_data.metadata}`;
  }

  if (params.meta_data.cursor) {
    url += `&cursor=${params.meta_data.cursor}`;
  }

  if (params.key) {
    url += `&key=${params.key}`;
  }
  return url;
}

}
