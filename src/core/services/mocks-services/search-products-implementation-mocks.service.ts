import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductMapper } from 'src/core/adapters/product-mapper/product-mapper.mapper';
import { IReponseProductsResult, ProductoEntity } from 'src/core/entities/producto-entity';
import { TransformProductModelToFacetList, contructionParams } from 'src/core/adapters/product-facet-filters/functions-for-searchImplementations.service';
import { SearchParams } from 'src/core/helpers/metadata-products';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';
import { ProductModel } from 'src/core/models/product.model';
import { ProductRepository } from 'src/core/repository/product-repository';

@Injectable()
export class SearchProductsMocksService extends ProductRepository {

  constructor(
    private readonly http: HttpClient
  ) { super() }

  private mapperProduct = new ProductMapper();
  private transformProductListToFacet = new TransformProductModelToFacetList();
  private facetFilter$ = new BehaviorSubject<IFilterFacetList>(Object.assign({}));

  searchProductByKeyword(params: SearchParams): Observable<ProductModel[]> {
    let page: number = 0;
    let url: string = '/assets/json/mocks-response-products.json';
    console.log(params)
    return this.http.get<IReponseProductsResult>(url)
      .pipe(
        map((response) => {
          if (params.meta_data.pages !== 1) {
            page = params.meta_data.pages * 10
          }
          this.facetFilter$.next(this.transformProductListToFacet.mapTo(this.mapperProduct.mapTo(response.products)));
          return this.mapperProduct.mapTo(response.products.slice(page, 10))
        })
      )
  }

  getFacetListForSearch(): Observable<IFilterFacetList> {
    return this.facetFilter$.asObservable();
  }

  searcProductByFacetFilter(params: SearchParams): Observable<ProductModel[]> {

    let proxyUrlForCors: string = 'https://cors-anywhere.herokuapp.com/';
    let url: string = proxyUrlForCors + 'https://api.barcodelookup.com/v3/products?';
    let resp: any = {};
    let _url = contructionParams(params, url);

    url = '/assets/json/mocks-response-products.json';
    // console.log('url mockeada para producccion: ', url)

    // console.log(params);
    // console.log(_url)

    return this.http.get<IReponseProductsResult>(url)
      .pipe(
        map((response) => {
          this.facetFilter$.next(this.transformProductListToFacet.mapTo(this.mapperProduct.mapTo(response.products)));
          if (params.category) {
            resp = this.searchByCategory(this.mapperProduct.mapTo(response.products), params);
          }
          if (params.barcode) {
            resp = this.searchBybarcode(this.mapperProduct.mapTo(response.products), params);
          }
          return resp
        })
      )
  }

  private searchByCategory(listProducts: ProductModel[], serachParams: SearchParams): ProductModel[] {
    return listProducts.filter(product => product.category.includes(serachParams.category?.toString() as string));
  }

  private searchBybarcode(listProducts: ProductModel[], serachParams: SearchParams): ProductModel[] {
    return listProducts.filter(product => product.barcode_number.includes(serachParams.barcode?.toString() as string));
  }
}
