/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ProductsService } from './products-implementation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductRepository } from '../repository/product-repository';

import { of } from 'rxjs';

import { Metadata, SearchParams } from '../helpers/metadata-products';
import { ProductoEntity } from '../entities/producto-entity';
import { API_ProductBarcode, environment } from 'src/environments/environment';
import { mocksProductsEntity, mocksProductsModel } from '../helpers/mocks-objects';
import { ProductMapper } from '../adapters/product-mapper/product-mapper.mapper';
import { ProductModel } from '../models/product.model';

describe('Service: Products', () => {

  let service: ProductsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let metadata: Metadata
  // let params: any;
  let url: string;
  let params: SearchParams;

  beforeAll(() => {

    params = {
      barcode: '1234567890123',
      // search: 'apple',
      title: 'Nike Red Running Shoes - Size 10',
      mpn: 'AAAAAAA',
      // key: environment.AuthenticationKey.key as string,
      meta_data: {
        pages: 1,
        products: 0,
        current_cursor: 'current_cursor=y',
        next_cursor: 'next_cursor=y',
      }
    };

    // url = `https://api.barcodelookup.com/v3/products?${params.searchParameters}&formatted=y&${params.meta_data.current_cursor}&key=${environment.AuthenticationKey.key}`;
    url = API_ProductBarcode.searchKeyWord;

    let paramsArray: string[] = [];

    if (params.barcode) {
      paramsArray.push(`barcode=${params.barcode}`);
    }

    if (params.search) {
      paramsArray.push(`search=${params.search}`);
    }

    if (params.mpn) {
      paramsArray.push(`mpn=${params.mpn}`);
    }

    if (params.title) {
      paramsArray.push(`title=${params.title}`);
    }

    if (params.metadata) {
      paramsArray.push(`metadata=${params.metadata}`);
    }

    if (params.cursor) {
      paramsArray.push(`cursor=${params.cursor}`);
    }

    if (params.key) {
      paramsArray.push(`key=${params.key}`);
    }

    url += paramsArray.join('&');

  });

  afterAll(() => {
    httpMock.verify();
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);

  }));

  it('should create service', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));

  it('Should return a list of ProductEntity from searchProductByKeyword(params:SearchParams):Observable', () => {

    //Verificar que tenga el listado de parametros
    expect(service.getParamsArray()).toBeDefined();

    const expectedResponse: ProductModel[] = new ProductMapper().mapTo(mocksProductsEntity);
    service.searchProductByKeyword(params).subscribe((result) => {
      expect(result).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mocksProductsEntity);
  });

});
