import { Injectable } from '@angular/core';
import { ProductRepository } from '../repository/product-repository';

import { HttpClient } from '@angular/common/http';

import { Observable, EMPTY, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductModel } from '../models/product.model';
import { Metadata, SearchParams } from '../helpers/metadata-products';
import { IReponseProductsResult, ProductoEntity } from '../entities/producto-entity';
import { API_ProductBarcode, environment } from 'src/environments/environment';
import { ProductMapper } from '../adapters/product-mapper/product-mapper.mapper';
import { IFilterFacetList } from '../models/filter-facet.models';
import { contructionParams } from '../helpers/functions-for-searchImplementations.service';

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

    let proxyUrlForCors: string = 'https://cors-anywhere.herokuapp.com/';
    let url: string = proxyUrlForCors + 'https://api.barcodelookup.com/v3/products?';

    url = contructionParams(params, url);

    return this.http.get<IReponseProductsResult>(url)
      .pipe(
        map((response) => {
          // console.log('response of service: ', response)
          return this.mapperProduct.mapTo(response.products)
        })
      )
  }


  getFacetListForSearch(params: ProductModel[]): Observable<IFilterFacetList> {
    let filterFacetList: IFilterFacetList = { barcodeList: [], categories: [], titleList: [] };

    if (params && params.length > 0) {
      return of(filterFacetList)
    }
    return of(filterFacetList)
  }



}
