import { Injectable } from '@angular/core';
import { ProductRepository } from '../repository/product-repository';

import { HttpClient } from '@angular/common/http';

import { Observable, EMPTY, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductModel } from '../models/product.model';
import { Metadata, SearchParams } from '../helpers/metadata-products';
import { IReponseProductsResult, ProductoEntity } from '../entities/producto-entity';
import { API_ProductBarcode, environment } from 'src/environments/environment';
import { ProductMapper, ProductoMapperResponse } from '../adapters/product-mapper/product-mapper.mapper';
import { IFilterFacetList } from '../models/filter-facet.models';
import { contructionParams, TransformProductModelToFacetList } from '../adapters/product-facet-filters/functions-for-searchImplementations.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductRepository {

  constructor(private readonly http: HttpClient) { super() }

  private mapperProduct = new ProductMapper();
  private mapperProductsResult = new ProductoMapperResponse();
  private transformProductListToFacet = new TransformProductModelToFacetList();
  private paramsArray: string[] = [];
  private facetFilter$ = new BehaviorSubject<IFilterFacetList>(Object.assign({}));
  private metaData$ = new BehaviorSubject<Metadata>(Object.assign({}));

  page: number = 1;
  pageEnd: number = 10;

  getParamsArray() {
    return this.paramsArray;
  }

  /**
 * Obtiene un listado de los productos intruduciendo palabras claves en tiempo real, como es el titulo,
 * mnp, barcode, categoria, marca y asi.
 * @param params @type SearchParams
 * @returns Observable<{ products: ProductModel[], metadata: Metadata }>
 */
  searchProductByKeyword(params: SearchParams): Observable<{ products: ProductModel[], metadata: Metadata }> {

    console.log(params)
    let proxyUrlForCors: string = 'https://cors-anywhere.herokuapp.com/';
    let url: string = proxyUrlForCors + 'https://api.barcodelookup.com/v3/products?';
    url = contructionParams(params, url);
    console.log('URL Service: ', url)
    // Paginat
    this.page = params.metadata.pages; // Suponiendo que queremos probar la segunda página
    const productsPerPage = 10; // Cantidad de productos por página
    this.pageEnd = this.page * productsPerPage;
    const startIndex = (this.page - 1) * productsPerPage;

    return this.http.get<IReponseProductsResult>(url)
      .pipe(
        map((response) => {
          const productsOnPage = response.products.slice(startIndex, this.pageEnd);
          this.facetFilter$.next(this.transformProductListToFacet.mapTo(this.mapperProduct.mapTo(productsOnPage)));
          this.metaData$.next(response.metadata);
          return this.mapperProductsResult.mapTo({ products: productsOnPage, metadata: response.metadata })
        })
      )
  }


  getFacetListForSearch(): Observable<IFilterFacetList> {
    return this.facetFilter$.asObservable();
  }

  searcProductByFacetFilter(params: SearchParams): Observable<{ products: ProductModel[], metadata: Metadata }> {

    this.page = params.metadata.pages; // Suponiendo que queremos probar la segunda página
    const productsPerPage = 10; // Cantidad de productos por página
    this.pageEnd = this.page * productsPerPage;
    const startIndex = (this.page - 1) * productsPerPage;

    let proxyUrlForCors: string = 'https://cors-anywhere.herokuapp.com/';
    let url: string = proxyUrlForCors + 'https://api.barcodelookup.com/v3/products?';

    url = contructionParams(params, url);

    console.log('SERVICE url: ', url)
    // console.log('SERVICE params: ', params)
    return this.http.get<IReponseProductsResult>(url)
      .pipe(
        map((response) => {

          const productsOnPage = response.products.slice(startIndex, this.pageEnd);
          this.facetFilter$.next(this.transformProductListToFacet.mapTo(this.mapperProduct.mapTo(productsOnPage)));

          let resp: { products: ProductoEntity[], metadata: Metadata } = {
            products: response.products, // Puedes asignar un arreglo vacío aquí
            metadata: response.metadata // Asigna la metadata de la respuesta original
          };
          // resp = {
          //   ...resp,
          //   metadata: {
          //     ...resp.metadata,
          //     pages: Math.ceil(resp.products.length / productsPerPage),
          //     products: resp.products.length
          //   }
          // };
          return this.mapperProductsResult.mapTo(resp)
        })
      )
  }
}
