import { Injectable } from '@angular/core';
import { ProductRepository } from '../repository/product-repository';

import { HttpClient } from '@angular/common/http';

import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductModel } from '../models/product.model';
import { Metadata, SearchParams } from '../helpers/metadata-products';
import { IReponseProductsResult, ProductoEntity } from '../entities/producto-entity';
import { API_ProductBarcode, environment } from 'src/environments/environment';
import { ProductMapper } from '../adapters/product-mapper.mapper';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductRepository {

  constructor(private readonly http: HttpClient) { super() }

  private mapperProduct = new ProductMapper();

  private paramsArray: string[] = [];

  getParamsArray() {
    return this.paramsArray;
  }

  
  searchProductByKeyword(params: SearchParams): Observable<ProductModel[]> {

    let url: string = 'https://api.barcodelookup.com/v3/products?';

    url = this.contructionParams(params, url);

    return this.http.get<ProductoEntity[]>(url)
      .pipe(
        map((response) => {
          return this.mapperProduct.mapTo(response)
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

    if (params.metadata) {
      url += `&metadata=${params.metadata}`;
    }

    if (params.cursor) {
      url += `&cursor=${params.cursor}`;
    }

    if (params.key) {
      url += `&key=${params.key}`;
    }
    return url;
  }

}
