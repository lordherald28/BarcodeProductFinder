import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ProductMapper, ProductoMapperResponse } from 'src/core/adapters/product-mapper/product-mapper.mapper';
import { IReponseProductsResult, ProductoEntity } from 'src/core/entities/producto-entity';
import {  contructionParams } from 'src/core/adapters/product-facet-filters/functions-for-searchImplementations.service';
import { Metadata, SearchParams } from 'src/core/helpers/metadata-products';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';
import { ProductModel } from 'src/core/models/product.model';
import { ProductRepository } from 'src/core/repository/product-repository';

@Injectable()
export class SearchProductsMocksService extends ProductRepository {

  constructor(
    private readonly http: HttpClient
  ) { super() }

  private mapperProduct = new ProductMapper();
  private mapperProductsResult = new ProductoMapperResponse();
  // private transformProductListToFacet = new TransformProductModelToFacetList();
  private facetFilter$ = new BehaviorSubject<IFilterFacetList>(Object.assign({}));
  private metaData$ = new BehaviorSubject<Metadata>(Object.assign({}));
  page: number = 1;
  pageEnd: number = 10;

  /**
   * Obtiene un listado de los productos intruduciendo palabras claves en tiempo real, como es el titulo,
   * mnp, barcode, categoria, marca y asi.
   * @param params @type SearchParams
   * @returns Observable<{ products: ProductModel[], metadata: Metadata }>
   */
  searchProductByKeyword(params: SearchParams): Observable<{ products: ProductModel[], metadata: Metadata }> {

    // console.log(params)
    this.page = params.metadata.pages; // Suponiendo que queremos probar la segunda página
    const productsPerPage = 10; // Cantidad de productos por página
    this.pageEnd = this.page * productsPerPage;
    const startIndex = (this.page - 1) * productsPerPage;
    let url: string = '/assets/json/data.json';

    return this.http.get<IReponseProductsResult>(url)
      .pipe(
        map((response) => {
          let resp = {
            ...response,
            products: response.products.filter(product => product.title.toLocaleLowerCase().trim().includes(params.search?.toLocaleLowerCase().trim()?.toString() as string))
          }
          const productsOnPage = resp.products.slice(startIndex, this.pageEnd);
          // this.facetFilter$.next(this.transformProductListToFacet.mapTo(this.mapperProduct.mapTo(productsOnPage)));
          this.metaData$.next(resp.metadata);
          return this.mapperProductsResult.mapTo({
            products: productsOnPage, metadata: {
              ...resp.metadata,
              pages: Math.ceil(resp.products.length / productsPerPage),
              products: resp.products.length
            }
          })
        })
      )
  }

  /**
   * Busca un producto por varios filtros o en este caso parametros lo cuales estan limitados por la API Barcode
   * @param params SearchParams
   * @returns Observable<{ products: ProductModel[], metadata: Metadata }> 
   */
  searcProductByFacetFilter(params: SearchParams): Observable<{ products: ProductModel[], metadata: Metadata }> {

    this.page = params.metadata.pages;
    const productsPerPage = 10; // Cantidad de productos por página
    this.pageEnd = this.page * productsPerPage;
    const startIndex = (this.page - 1) * productsPerPage;

    let proxyUrlForCors: string = 'https://cors-anywhere.herokuapp.com/';
    let url: string = proxyUrlForCors + 'https://api.barcodelookup.com/v3/products?';
    let resp: any = {};
    let _url = contructionParams(params, url);

    url = '/assets/json/data.json';

    return this.http.get<IReponseProductsResult>(url)
      .pipe(
        map((response) => {
          let filteredProducts = response.products;

    
          if (params.category) {
            let decoderUrlCategory = decodeURIComponent(params.category)
            params = {
              ...params,
              category: decoderUrlCategory
            }
            filteredProducts = this.searchByCategory(filteredProducts, params) as any;
          }
          if (params.barcode) {
            filteredProducts = this.searchBybarcode(filteredProducts, params) as any;
          }
            const totalProducts = filteredProducts.length;
          const totalPages = Math.ceil(totalProducts / productsPerPage);
          const productsOnPage = filteredProducts.slice(startIndex, this.pageEnd);

          let resp: { products: ProductModel[], metadata: Metadata } = {
            products: productsOnPage,
            metadata: {
              ...response.metadata,
              pages: totalPages,
              products: totalProducts
            }
          };

          return resp;
        })
      )

  }


  /**
   * Se encarga de enviar los filtros para la busqueda facetada o avanzada.
   * @returns Observable<IFilterFacetList>
   */
  getFacetListForSearch(): Observable<IFilterFacetList> {
    return this.facetFilter$.asObservable();
  }

  /**
   * Se encagar de enviar el estado del resultado arrojado.
   * @example 
   *    "metadata": {
        "pages": 129652,
        "products": 1296514,
        "current_cursor": "y",
        "next_cursor": "AoEpMTAwMDA4NTk1"
    },
  
   * @returns Observable<Metadata>
   */
  getMetaData(): Observable<Metadata> {
    return this.metaData$.asObservable();
  }


  private searchByCategory(listProducts: ProductModel[], serachParams: SearchParams): ProductModel[] {
    return listProducts.filter(product => product.category.trim().toLocaleLowerCase().includes(serachParams.category?.trim().toLocaleLowerCase().toString() as string));
  }

  private searchBybarcode(listProducts: ProductModel[], serachParams: SearchParams): ProductModel[] {
    return listProducts.filter(product => product.barcode_number.includes(serachParams.barcode?.toString() as string));
  }
}
