import { Injectable } from '@angular/core';
import { ProductRepository } from '../../repository/product-repository';

import { HttpClient } from '@angular/common/http';

import { Observable, EMPTY, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { Metadata, SearchParams } from '../../helpers/metadata-products';
import { IReponseProductsResult, ProductoEntity } from '../../entities/producto-entity';
import { API_ProductBarcode, environment } from 'src/environments/environment';
import { ProductMapper, ProductoMapperResponse } from '../../adapters/product-mapper/product-mapper.mapper';
import { IFilterFacetList } from '../../models/filter-facet.models';
import { contructionParams, TransformProductModelToFacetList } from '../../adapters/product-facet-filters/functions-for-searchImplementations.service';
import { IMessages } from 'src/core/models/message-notify.models';

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
  public messageNotify: IMessages = {};
  page: number = 1;
  pageEnd: number = 10;
  private responseForWithoutBarcode: { products: ProductoEntity[], metadata: Metadata } = { metadata: { pages: 0, products: 0 }, products: [] }
  private responseForWithBarcode: { products: ProductoEntity[], metadata: Metadata } = { metadata: { pages: 0, products: 0 }, products: [] }
  private metadata: Metadata = {
    pages: 0,
    products: 0
  }

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

    let proxyUrlForCors: string = 'https://cors-anywhere.herokuapp.com/';
    let url: string = proxyUrlForCors + 'https://api.barcodelookup.com/v3/products?';
    url = contructionParams(params, url);

    return this.http.get<IReponseProductsResult>(url)
      .pipe(
        map((response) => {
          this.facetFilter$.next(this.transformProductListToFacet.mapTo(this.mapperProduct.mapTo(response.products)));
          this.metaData$.next(response.metadata);
          return this.mapperProductsResult.mapTo(response)
        })
      )
  }


  getFacetListForSearch(): Observable<IFilterFacetList> {
    return this.facetFilter$.asObservable();
  }

  searcProductByFacetFilter(params: SearchParams): Observable<{ products: ProductModel[], metadata: Metadata }> {


    let proxyUrlForCors: string = 'https://cors-anywhere.herokuapp.com/';
    let url: string = proxyUrlForCors + 'https://api.barcodelookup.com/v3/products?';

    url = contructionParams(params, url);

    return this.http.get<IReponseProductsResult>(url)
      .pipe(
        map((response: IReponseProductsResult | {products:ProductoEntity[]}) => {

          // Se realiza esta condicion debido a la respues de la api que no es homogenea en sus respuestas cuando es search por barcode
          if (params.barcode) {

            this.metadata = {
              pages: Math.ceil((response.products as ProductoEntity[]).length / 10),
              products: (response.products as ProductoEntity[]).length
            }
            this.responseForWithBarcode = {
              // ...resp,
              products: response.products as unknown as ProductoEntity[],
              metadata: this.metadata
            }
            // console.log(this.responseForWithBarcode);
            this.facetFilter$.next(this.transformProductListToFacet.mapTo(this.mapperProduct.mapTo(this.responseForWithBarcode.products)));
            return this.mapperProductsResult.mapTo(this.responseForWithBarcode)

          } else {

            this.responseForWithoutBarcode = {
              products: (response as IReponseProductsResult).products, // Puedes asignar un arreglo vacío aquí
              metadata: (response as IReponseProductsResult).metadata // Asigna la metadata de la respuesta original
            };
            this.facetFilter$.next(this.transformProductListToFacet.mapTo(this.mapperProduct.mapTo(this.responseForWithoutBarcode.products)));
            return this.mapperProductsResult.mapTo(this.responseForWithoutBarcode)
          }

        })
      )
  }
  
}
