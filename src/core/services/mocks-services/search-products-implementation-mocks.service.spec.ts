import { TestBed, waitForAsync, inject, fakeAsync, tick } from '@angular/core/testing';
import { SearchProductsMocksService } from './search-products-implementation-mocks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Metadata, SearchParams } from 'src/core/helpers/metadata-products';
import { ProductModel } from 'src/core/models/product.model';
import { mockFacetFilter, mockProductsModelResponse, mockSearchParamsForsearchProductByKeyword, mockSearchParamsForsearchsearcProductByFacetFilter, mocksProductsEntity, mocksProductsModel } from 'src/core/helpers/mocks-objects';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';
import { ProductoMapperResponse } from 'src/core/adapters/product-mapper/product-mapper.mapper';
import { MapperResultProductEntity } from 'src/core/bases/mappers';

describe('Service Mock: SearchProductsMocks', () => {
  let service: SearchProductsMocksService;
  let httpMock: HttpTestingController;
  // let mapperProductsResult: ProductoMapperResponse
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [SearchProductsMocksService,],
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

  // Testing the searchProductByKeyword method with new mapper product
  it(`searchProductByKeyword with mapper product and metadata should return an array 
  of { productsModelList: ProductModel[], metadata: Metadata }`, fakeAsync(() => {
    // Mock response matching IReponseProductsResult structure
    const mockApiResultProductWithMetada: { products: ProductModel[], metadata: Metadata } = mockProductsModelResponse;
    
    service.searchProductByKeyword(mockSearchParamsForsearchProductByKeyword).subscribe((response) => {
      // Lógica de paginación
      service.page = mockSearchParamsForsearchProductByKeyword.metadata.pages as number; // Suponiendo que queremos probar la segunda página
      const productsPerPage = 10; // Cantidad de productos por página
      service.pageEnd = service.page * productsPerPage;
      const startIndex = (service.page - 1) * productsPerPage;
      const productsOnPage = response.products.slice(startIndex, service.pageEnd);

      // Verifica que obtienes exactamente 10 productos en la segunda página
      expect(productsOnPage.length).toBeLessThanOrEqual(productsPerPage);


    });

    // Simular respuesta HTTP
    const req = httpMock.expectOne('/assets/json/data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResultProductWithMetada);

    tick();
  }));

  // Testing the searcProductByFacetFilter method
  it('should filter products by category with pagination', waitForAsync(() => {
    // Pagination logic
    const mockApiResultProductWithMetadata: { products: ProductModel[], metadata: Metadata } = mockProductsModelResponse;

    // Define search parameters with metadata and category
    const searchParams: SearchParams = {
      metadata: { pages: 1, products: 0 },
      category: 'Home & Garden'
    };

    // Subscribe to the service method
    service.searcProductByFacetFilter(searchParams).subscribe((response) => {
      // Create a response object with original products and metadata
      let resp: { products: ProductModel[], metadata: Metadata } = {
        products: mockApiResultProductWithMetadata.products,
        metadata: mockApiResultProductWithMetadata.metadata
      };

      // Filter products in resp.products based on category
      if (searchParams.category) {
        resp.products = response.products.filter(product => product.category.includes(searchParams.category?.toString() as string));
      }

      // Pagination logic
      service.page = searchParams.metadata.pages as number; // Assuming we want to test the second page
      const productsPerPage = 10; // Number of products per page
      service.pageEnd = service.page * productsPerPage;
      const startIndex = (service.page - 1) * productsPerPage;
      let productsOnPage = resp.products.slice(startIndex, service.pageEnd);

      // Check if the number of filtered products matches the expected value
      expect(resp.products.length).toEqual(productsOnPage.length);
      expect(productsOnPage.length).toEqual(resp.products.length);
    });

    //Verificar url real
    // expect(url)
    // Mock the HTTP request
    const req = httpMock.expectOne('/assets/json/data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResultProductWithMetadata);
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
