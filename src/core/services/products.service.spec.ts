/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductRepository } from '../repository/product-repository';

import { Metadata } from '../helpers/metadata-products';
import { ProductoEntity } from '../entities/producto-entity';
import { environment } from 'src/environments/environment';
import { mocksProductsEntity } from '../helpers/mocks-objects';

describe('Service: Products', () => {

  let service: ProductsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);

  }));

  it('should ...', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));

  it('Debe retornar un listado de ProductEntity searchProductByKeyword():Observable', () => {

    const metadata: Metadata = {
      pages: 0,
      products: 0,
      current_cursor: 'current_cursor=y',
      next_cursor: 'next_cursor=y',
    }
    let params = {
      meta_data: metadata,
      searchParameters: "barcode=886736874135,title=Nike Red Running Shoes - Size 10"
    };

    //Se debe sobrescribir la , por el operador &
    params = {
      meta_data: params.meta_data,
      searchParameters: params.searchParameters.replace(',', '&')
    }

    service.searchProductByKeyword(params).subscribe((result) => {
      // Debe estar definido un producto entity
      expect(result[0].barcode_number).toBeDefined();

    });

    const url: string = `https://api.barcodelookup.com/v3/products?${params.searchParameters}&formatted=y&${params.meta_data.current_cursor}&key=${environment.AuthenticationKey.key}`;

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mocksProductsEntity);

  });

});
