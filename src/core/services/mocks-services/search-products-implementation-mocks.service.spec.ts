/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchProductsMocksService } from './search-products-implementation-mocks.service';

describe('Service: SearchProductsMocks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchProductsMocksService]
    });
  });

  it('should ...', inject([SearchProductsMocksService], (service: SearchProductsMocksService) => {
    expect(service).toBeTruthy();
  }));
});
