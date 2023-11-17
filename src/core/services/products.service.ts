import { Injectable } from '@angular/core';
import { ProductRepository } from '../repository/product-repository';

import { HttpClient } from '@angular/common/http';

import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductModel } from '../models/product.model';
import { Metadata } from '../helpers/metadata-products';
import { IReponseProductsResult, ProductoEntity } from '../entities/producto-entity';
import { API_ProductBarcode, environment } from 'src/environments/environment';
import { ProductMapper } from '../adapters/product-mapper.mapper';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductRepository {

  constructor(private readonly http: HttpClient) { super() }

  searchProductByKeyword(params: { meta_data: Metadata; searchParameters: string }): Observable<ProductModel[]> {

    const url: string = 'https://api.barcodelookup.com/v3/products?';

    return this.http.get<ProductoEntity[]>(url + `${params.searchParameters}&formatted=y&${params.meta_data.current_cursor}&key=${environment.AuthenticationKey.key}`)
      .pipe(
        map((response) => {
          return response
        })
      )
  }



}
