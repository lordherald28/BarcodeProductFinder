import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import PageProductComponent from './page-product.component';;
import { UseCaseSearchProducts } from 'src/core/use-case/use-case-search-products';
import { UseCasesearcProductByFacetFilter } from 'src/core/use-case/use-case-search-facet';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/core/core.module';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { SearchBoxGeneralComponent } from 'src/shared/components/search-box-general/search-box-general.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { SidebarFilterComponent } from './components/sidebar-filter/sidebar-filter.component';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';

describe('PageProductComponent', () => {
  let component: PageProductComponent;
  let fixture: ComponentFixture<PageProductComponent>;

  // Mock services and ChangeDetectorRef
  const mockUseCaseSearchProducts = jasmine.createSpyObj('UseCaseSearchProducts', ['execute']);
  const mockUseCaseSearchFacet = jasmine.createSpyObj('UseCasesearcProductByFacetFilter', ['execute']);
  const mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      imports: [CommonModule, SearchBoxGeneralComponent, SidebarFilterComponent, CardProductComponent, HeaderComponent, CoreModule],
      providers: [
        { provide: UseCaseSearchProducts, useValue: mockUseCaseSearchProducts },
        { provide: UseCasesearcProductByFacetFilter, useValue: mockUseCaseSearchFacet },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
      ],
    });

    fixture = TestBed.createComponent(PageProductComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getValueChangeInput', () => {
    it('should call getProductList and markForCheck', () => {
      const value = 'testValue';
      spyOn(component, 'getProductList');
      spyOn(component.cdr, 'markForCheck');

      component.getValueChangeInput(value);

      expect(component.getProductList).toHaveBeenCalledWith(value);
      expect(component.cdr.markForCheck).toHaveBeenCalled();
    });
  });

  // describe('getProductList', () => {
  //   it('should call UseCaseSearchProducts.execute and update productsList', fakeAsync(() => {

  //     const metadata: Metadata = {
  //       pages: 1,
  //       products: 0,
  //     };

  //     let searchParams: SearchParams = {
  //       metadata: { pages: 1, products: 0 },

  //     }
  //     searchParams = {
  //       metadata: { pages: 1, products: 0 },
  //       hasMetadata: 'y',
  //       asin: '',
  //       barcode: '',
  //       brand: '',
  //       category: '',
  //       manufacture: '',
  //       mpn: '',
  //       title: '',
  //       search: 'testValue',
  //       key: '5whl0cj9iw7u7onrzyxqps8kl4rvoz'
  //     };

  //     const value = 'testValue';
  //     const spyUseCaseSearchProducts = fixture.debugElement.injector.get(UseCaseSearchProducts);
  //     spyOn(spyUseCaseSearchProducts, 'execute').and.returnValue(of({ products: mocksExpectedProductsModel, metadata }));
  //     component.getProductList(value);

  //     fixture.whenStable().then(() => {
  //       expect(component.productsList).toEqual(mocksProductsModel);
  //       // Ajusta la expectativa para que coincida con los argumentos reales
  //       expect(spyUseCaseSearchProducts.execute).toHaveBeenCalledWith(searchParams);
  //     });
  //   }));
  // });
  describe('PageProductComponent', () => {
    describe('getProductList', () => {
      it('should update component state and call OnEventPage', () => {
        const value = 'testValue';
  
        // Espiar el método OnEventPage para verificar su llamada
        spyOn(component, 'OnEventPage').and.callThrough();
  
        component.getProductList(value);
  
        // Verificar que OnEventPage se haya llamado con el argumento correcto
        expect(component.OnEventPage).toHaveBeenCalledWith(1);
        // Verificar que el estado del componente se haya actualizado correctamente
        expect(component.currentKeyValue).toEqual(value);
        expect(component.isSerachGeneral).toBeTrue();
        expect(component.hasResetPagination).toBeTrue();
        expect(component.updateChild).toBeTrue();
      });
    });
  });
  
// Test suite for PageProductComponent
describe('PageProductComponent', () => {

  // Test group for getProductListByFacetFilters method
  describe('getProductListByFacetFilters', () => {

    // Test case to verify that getProductListByFacetFilters sets search parameters correctly
    // and calls OnEventPage method
    it('should properly set search parameters and call OnEventPage', waitForAsync(() => {
      const paramFaceFilter: IFilterFacetList = {
        categories: "Media > Books > Print Books" as any,
        // Add other filter properties if needed
      };

      // Spy on OnEventPage method to track its invocation and arguments
      spyOn(component, 'OnEventPage').and.callThrough();

      // Call getProductListByFacetFilters with the facet filter parameters
      component.getProductListByFacetFilters(paramFaceFilter);

      // Verify that OnEventPage is called with the correct argument
      expect(component.OnEventPage).toHaveBeenCalledWith(1);

      // Assert that the component's searchParams are updated based on the facet filter
      expect(component.searchParams.category).toEqual(paramFaceFilter.categories as any);
      // Add additional assertions for other searchParams properties as needed

      // Check the component's internal state changes
      expect(component.isSerachGeneral).toBeFalse();
      expect(component.hasResetPagination).toBeTrue();

    }));
  });

});

});
