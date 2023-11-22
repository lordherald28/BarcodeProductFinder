import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { SearchProductsMocksService } from './search-products-implementation-mocks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchParams } from 'src/core/helpers/metadata-products';
import { ProductModel } from 'src/core/models/product.model';
import { mockFacetFilter, mockSearchParamsForsearchProductByKeyword, mockSearchParamsForsearchsearcProductByFacetFilter, mocksProductsEntity, mocksProductsModel } from 'src/core/helpers/mocks-objects';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';

describe('Service Mock: SearchProductsMocks', () => {
  let service: SearchProductsMocksService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [SearchProductsMocksService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SearchProductsMocksService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Tests if the service is correctly created.
  });

  // Testing the searchProductByKeyword method
  it('searchProductByKeyword should return an array of ProductModel', waitForAsync(() => {
    // Mock response matching IReponseProductsResult structure
    const mockApiResponse = {
      products: mocksProductsEntity
    };

    // Expected products after the mapper transformation
    const expectedProducts: ProductModel[] = mocksProductsModel;

    service.searchProductByKeyword(mockSearchParamsForsearchProductByKeyword).subscribe(products => {
      let page: number = 0;
      if (mockSearchParamsForsearchProductByKeyword.meta_data.pages !== 1) {
        page = mockSearchParamsForsearchProductByKeyword.meta_data.pages * 10
      }
      expect(products).toEqual(expectedProducts.slice(page, 10)); // Checks if the returned products match the expected results.
    });

    const req = httpMock.expectOne('/assets/json/mocks-response-products.json');
    expect(req.request.method).toBe('GET'); // Verifies the HTTP request method
    req.flush(mockApiResponse); // Sends the mock response
  }));

  // Testing the searcProductByFacetFilter method
  it('searcProductByFacetFilter should filter products by category', waitForAsync(() => {
    const mockApiResponse = { products: mocksProductsEntity };
    const expectedFilteredProducts: ProductModel[] = mocksProductsModel;
    const searchParams: SearchParams = mockSearchParamsForsearchsearcProductByFacetFilter;

    service.searcProductByFacetFilter(searchParams).subscribe(filteredProducts => {
      expect(filteredProducts.length).toEqual(1); // Checks if the number of filtered products is as expected
      expect(filteredProducts).toEqual(expectedFilteredProducts); // Checks if the filtered products match the expected results
    });

    const req = httpMock.expectOne('/assets/json/mocks-response-products.json');
    expect(req.request.method).toBe('GET'); // Verifies the HTTP request method
    req.flush(mockApiResponse); // Sends the mock response
  }));

  // Testing the getFacetListForSearch method
  it('getFacetListForSearch should return the current facet filter list', waitForAsync(() => {
    const _mockFacetFilter: IFilterFacetList = mockFacetFilter;

    // Changes the state of facetFilter$
    service['facetFilter$'].next(_mockFacetFilter);

    service.getFacetListForSearch().subscribe(facetFilter => {
      expect(facetFilter).toEqual(mockFacetFilter); // Checks if the facet filter list matches the mock data
    });
  }));

});
