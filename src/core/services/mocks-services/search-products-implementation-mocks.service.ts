import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {map} from  'rxjs/operators';

import { ProductMapper } from 'src/core/adapters/product-mapper/product-mapper.mapper';
import { IReponseProductsResult } from 'src/core/entities/producto-entity';
import { SearchParams } from 'src/core/helpers/metadata-products';
import { ProductModel } from 'src/core/models/product.model';

@Injectable()
export class SearchProductsMocksService {

constructor(
  private readonly http : HttpClient
) { }

private mapperProduct = new ProductMapper();

searchProductByKeyword(params: SearchParams): Observable<ProductModel[]> {

  let url: string = '/assets/json/mocks-response-products.json';

  return this.http.get<IReponseProductsResult>(url)
    .pipe(
      map((response) => {
        // console.log('response of service: ', response)
        return this.mapperProduct.mapTo(response.products)
      })
    )
}


}
