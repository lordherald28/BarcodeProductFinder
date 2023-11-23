/* tslint:disable:no-unused-variable */

import { TestBed, fakeAsync, inject, tick, waitForAsync } from '@angular/core/testing';
import { ProductsService } from './products-implementation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductRepository } from '../repository/product-repository';

import { of } from 'rxjs';

import { Metadata, SearchParams } from '../helpers/metadata-products';
import { API_ProductBarcode, environment } from 'src/environments/environment';
import { mockFacetFilter, mockProductsModelResponse, mockSearchParamsForsearchProductByKeyword, mockSearchParamsForsearchsearcProductByFacetFilter, mocksProductsEntity, mocksProductsModel } from '../helpers/mocks-objects';
import { ProductMapper } from '../adapters/product-mapper/product-mapper.mapper';
import { ProductModel } from '../models/product.model';
import { IFilterFacetList } from '../models/filter-facet.models';
import { TransformProductModelToFacetList } from '../adapters/product-facet-filters/functions-for-searchImplementations.service';

describe('Service: Products', () => {

  let service: ProductsService;
  let httpMock: HttpTestingController;
  let url: string;
  let params: SearchParams;
  let proxyUrlForCors: string;
  let paramsArray: string[] = [];


  beforeAll(() => {


    params = {
      // barcode: '1234567890123',
      title: 'PRIMERO Ancient Garden 7 Ft. 10 in. X 11 Ft. 2 in. 57120-3767 Rug - Chocolate/Ivory',
      // category: 'Home & Garden > Decor > Rugs',
      // mpn: 'AAAAAAA',
      metadata: {
        pages: 1,
        products: 0,
        // current_cursor: 'y',
        // next_cursor: 'y',
      },
      hasMetadata: 'y',
      key: environment.AuthenticationKey.key
    };

    proxyUrlForCors = 'https://cors-anywhere.herokuapp.com/';

    // url = `https://api.barcodelookup.com/v3/products?${params.searchParameters}&formatted=y&${params.meta_data.current_cursor}&key=${environment.AuthenticationKey.key}`;
    url = proxyUrlForCors + API_ProductBarcode.searchKeyWord;


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

    if (params.asin) {
      paramsArray.push(`asin=${params.asin}`);
    }

    if (params.brand) {
      paramsArray.push(`brand=${params.brand}`);
    }

    if (params.manufacture) {
      paramsArray.push(`manufacture=${params.manufacture}`);
    }

    if (params.category) {
      paramsArray.push(`category=${params.category}`);
    }

    if (params.key) {
      paramsArray.push(`key=${params.key}`);
    }

    url += paramsArray.join('&');

  });

  afterAll(() => {
    // params = Object.assign({});
    // paramsArray = [];
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
  it(`searchProductByKeyword with mapper product and metadata should return an array of { productsModelList: ProductModel[], metadata: Metadata }`, fakeAsync(() => {

    let paramsArray: string[] = [];

    // Mock response matching IReponseProductsResult structure
    const mockApiResultProductWithMetada: { products: ProductModel[], metadata: Metadata } = mockProductsModelResponse;
    service.searchProductByKeyword(params).subscribe((response) => {

      service.page = mockSearchParamsForsearchProductByKeyword.metadata.pages as number; // Suponiendo que queremos probar la segunda página
      const productsPerPage = 10; // Cantidad de productos por página
      service.pageEnd = service.page * productsPerPage;
      const startIndex = (service.page - 1) * productsPerPage;
      const productsOnPage = response.products.slice(startIndex, service.pageEnd);
      // Verifica que obtienes exactamente 10 productos en la segunda página
      expect(productsOnPage.length).toEqual(10);

    });
    // Simular respuesta HTTP
    const expectedUrl = url;
    console.log('https://cors-anywhere.herokuapp.com/https://api.barcodelookup.com/v3/products?')
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET'); // Verifies the HTTP request method
    req.flush(mockApiResultProductWithMetada);

    // tick();
  }));

  // Testing the searcProductByFacetFilter method
  it('should filter products by allowed parameters  with pagination', waitForAsync(() => {
    // Pagination logic
    const mockApiResultProductWithMetadata: { products: ProductModel[], metadata: Metadata } = mockProductsModelResponse;

    const params = {
      // barcode: '1234567890123',
      title: 'PRIMERO Ancient Garden 7 Ft. 10 in. X 11 Ft. 2 in. 57120-3767 Rug - Chocolate/Ivory',
      // category: 'Home & Garden > Decor > Rugs',
      // mpn: 'AAAAAAA',
      metadata: {
        pages: 1,
        products: 0,
        // current_cursor: 'y',
        // next_cursor: 'y',
      },
      hasMetadata: 'y',
      key: environment.AuthenticationKey.key
    };

    paramsArray = [];

    if (params.title) {
      paramsArray.push(`title=${params.title.toLocaleLowerCase().trim()}`);
    }

    if (params.hasMetadata) {
      paramsArray.push(`metadata=${params.hasMetadata}`);
    }

    // if (params.category) {
    //   paramsArray.push(`category=${params.category}`);
    // }

    // Define search parameters with metadata and category
    // const searchParams: SearchParams = {
    //   metadata: { pages: 1, products: 0, cursor: 'cursor=y', metadata: 'y' },
    //   category: 'Home & Garden'
    // };

    // console.log(params)
    // console.log(url)

    // Subscribe to the service method
    service.searcProductByFacetFilter(params).subscribe((response) => {
      // Create a response object with original products and metadata
      let resp: { products: ProductModel[], metadata: Metadata } = {
        products: response.products,
        metadata: response.metadata
      };

      // console.log(response)
      // Filter products in resp.products based on category
      if (params.title) {
        resp.products = response.products.filter(product => product.category.includes(params.title?.trim().toLocaleLowerCase().toString() as string));
      }

      // Pagination logic
      service.page = params.metadata.pages as number; // Assuming we want to test the second page
      const productsPerPage = 10; // Number of products per page
      service.pageEnd = service.page * productsPerPage;
      const startIndex = (service.page - 1) * productsPerPage;
      let productsOnPage = resp.products.slice(startIndex, service.pageEnd);

      // Check if the number of filtered products matches the expected value

      // console.log('RESP:  ', resp.products.length);
      // console.log('productsOnPage:  ', productsOnPage.length);

      expect(resp.products.length).toEqual(productsOnPage.length);
      expect(productsOnPage.length).toEqual(resp.products.length);
    });
    // `https://cors-anywhere.herokuapp.com/https://api.barcodelookup.com/v3/products?&category=Home & Garden
    // ${searchParams.metadata.cursor}page=${searchParams.metadata.pages}`)
    // Mock the HTTP request
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResultProductWithMetadata);
  }));

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
