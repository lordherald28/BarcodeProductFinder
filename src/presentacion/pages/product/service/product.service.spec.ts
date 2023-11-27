/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductServiceComponent } from './product.service';

describe('Service: Product', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductServiceComponent]
    });
  });

  it('should ...', inject([ProductServiceComponent], (service: ProductServiceComponent) => {
    expect(service).toBeTruthy();
  }));
  
  it('should update dropdown values correctly', inject([ProductServiceComponent], (service: ProductServiceComponent) => {
    const mockProducts = [{ category: 'Electronics > Phones' }, { category: 'Electronics' }];
    const updatedValues = service.updateDropDownValues('category', mockProducts as any);
    expect(updatedValues).toEqual(['Electronics', 'Electronics > Phones']);
  }));
  
  it('should get values for dropdown', inject([ProductServiceComponent], (service: ProductServiceComponent) => {
    service.updateDropDownValues('category', [{ category: 'Electronics' }] as any);
    const values = service.getValuesForDropDown('category');
    expect(values).toEqual(['Electronics']);
  }));
  
  it('should transform selections to search params', inject([ProductServiceComponent], (service: ProductServiceComponent) => {
    const filterFacet = { brand: ['Apple'] };
    const searchParams = service.transformSelectionsToSearchParams(filterFacet, {} as any);
    expect(searchParams.brand).toEqual('Apple');
  }));
  
  it('should verify if any filter is selected', inject([ProductServiceComponent], (service: ProductServiceComponent) => {
    let searchParams = { brand: 'Apple' };
    expect(service.verifyisAnyFilterSelected(searchParams as any)).toBeTrue();
    searchParams = { brand: '' };
    expect(service.verifyisAnyFilterSelected(searchParams as any)).toBeFalse();
  }));
  
  it('should clear collected values', inject([ProductServiceComponent], (service: ProductServiceComponent) => {
    service.updateDropDownValues('category', [{ category: 'Electronics' }] as any);
    service.removeCollectedValues();
    const values = service.getValuesForDropDown('category');
    expect(values).toEqual([]);
  }));
  
});
