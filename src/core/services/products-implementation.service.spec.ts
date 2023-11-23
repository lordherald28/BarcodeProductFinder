/* tslint:disable:no-unused-variable */

import { TestBed, fakeAsync, inject, tick, waitForAsync } from '@angular/core/testing';
import { ProductsService } from './products-implementation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductRepository } from '../repository/product-repository';

import { of } from 'rxjs';

import { SearchParams } from '../helpers/metadata-products';
import { API_ProductBarcode } from 'src/environments/environment';
import { mockFacetFilter, mockSearchParamsForsearchProductByKeyword, mockSearchParamsForsearchsearcProductByFacetFilter, mocksProductsEntity, mocksProductsModel } from '../helpers/mocks-objects';
import { ProductMapper } from '../adapters/product-mapper/product-mapper.mapper';
import { ProductModel } from '../models/product.model';
import { IFilterFacetList } from '../models/filter-facet.models';
import { TransformProductModelToFacetList } from '../adapters/product-facet-filters/functions-for-searchImplementations.service';

describe('Service: Products', () => {

  let service: ProductsService;
  let httpMock: HttpTestingController;
  let url: string;
  let params: SearchParams;

  beforeAll(() => {

    params = {
      barcode: '1234567890123',
      title: 'Nike Red Running Shoes - Size 10',
      mpn: 'AAAAAAA',
      metadata: {
        pages: 1,
        products: 0,
        current_cursor: 'current_cursor=y',
        next_cursor: 'next_cursor=y',
      }
    };

    let proxyUrlForCors: string = 'https://cors-anywhere.herokuapp.com/';

    // url = `https://api.barcodelookup.com/v3/products?${params.searchParameters}&formatted=y&${params.meta_data.current_cursor}&key=${environment.AuthenticationKey.key}`;
    url = proxyUrlForCors + API_ProductBarcode.searchKeyWord;

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

    if (params.hasMetadata) {
      paramsArray.push(`metadata=${params.hasMetadata}`);
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

  // it('Should return a list of ProductEntity from searchProductByKeyword(params:SearchParams):Observable', fakeAsync(() => {
  //   // Verificar que tenga el listado de parametros
  //   expect(service.getParamsArray()).toBeDefined();

  //   const expectedResponse: ProductModel[] = new ProductMapper().mapTo(mocksProductsEntity);

  //   // Make the service call
  //   service.searchProductByKeyword(params).subscribe((result) => {
  //     // Verify that the result matches your expectations
  //     expect(result).toEqual(expectedResponse);
  //   });

  //   const req = httpMock.expectOne(url);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mocksProductsEntity);

  //   // Avanzar cualquier operación asincrónica pendiente
  //   tick();
  // }));
  /**
   * Revisar esto 22-11-2023
   */
  // it('should return a list of ProductModel when searching by keyword', (done) => {

  //   const expectedResponse: ProductModel[] = new ProductMapper().mapTo(mocksProductsEntity);
  //   // Act
  //   service.searchProductByKeyword(params).subscribe((result) => {
  //     // Assert
  //     expect(result).toEqual(expectedResponse);
  //     done(); // Call done to signal the completion of the test
  //   });

  //   // Expect a GET request to a specific URL based on your params
  //   const req = httpMock.expectOne(url);

  //   // Respond with a mock response
  //   req.flush({ products: mocksProductsEntity });

  // });

  // Testing the searcProductByFacetFilter method
  // Revisar 22-11-2023
  // it('searcProductByFacetFilter should filter products by category', waitForAsync(() => {
  //   const mockApiResponse = { products: mocksProductsEntity };
  //   const expectedFilteredProducts: ProductModel[] = mocksProductsModel;

  //   service.searcProductByFacetFilter(params).subscribe(filteredProducts => {
  //     expect(filteredProducts.length).toEqual(1); // Checks if the number of filtered products is as expected
  //     expect(filteredProducts).toEqual(expectedFilteredProducts); // Checks if the filtered products match the expected results
  //   });

  //   const req = httpMock.expectOne(url);
  //   expect(req.request.method).toBe('GET'); // Verifies the HTTP request method
  //   req.flush(mockApiResponse); // Sends the mock response
  // }));

  // Testing the getFacetListForSearch method
  it('getFacetListForSearch should return the current facet filter list', waitForAsync(() => {
    const _mockFacetFilter: IFilterFacetList = mockFacetFilter;

    // Changes the state of facetFilter$
    service['facetFilter$'].next(_mockFacetFilter);

    service.getFacetListForSearch().subscribe(facetFilter => {
      expect(facetFilter).toEqual(mockFacetFilter); // Checks if the facet filter list matches the mock data
    });
  }));

  it('getFacetListForSearch should return the current facet filter list', waitForAsync(() => {
    const _mockFacetFilter: IFilterFacetList = mockFacetFilter;

    // Changes the state of facetFilter$
    service['facetFilter$'].next(_mockFacetFilter);

    service.getFacetListForSearch().subscribe(facetFilter => {
      expect(facetFilter).toEqual(mockFacetFilter); // Checks if the facet filter list matches the mock data
    });
  }));

});
