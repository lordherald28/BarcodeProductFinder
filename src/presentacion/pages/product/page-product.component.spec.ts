import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import PageProductComponent from './page-product.component';;
import { UseCaseSearchProducts } from 'src/core/use-case/use-case-search-products';
import { UseCasesearcProductByFacetFilter } from 'src/core/use-case/use-case-search-facet';
import { ChangeDetectorRef } from '@angular/core';
import { ProductModel } from 'src/core/models/product.model';
import { SearchParams } from 'src/core/helpers/metadata-products';
import { of } from 'rxjs';
import { mockFacetFilter, mockProductsModelResponse, mockSearchParamsForsearchsearcProductByFacetFilter, mocksExpectedProductsModel, mocksProductsModel } from 'src/core/helpers/mocks-objects';
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

  /**
   * Revisa esto para refactorizacion:  22-11-2023 OK
   */

  describe('getProductList', () => {
    it('should call UseCaseSearchProducts.execute and update productsList', fakeAsync(() => {

      const metadata = {
        "pages": 3,
        "products": 30,
        "current_cursor": "y",
        "next_cursor": "AoEpMTAwMDA4NTk1"
      }
      const value = 'testValue';
      const spyUseCaseSearchProducts = fixture.debugElement.injector.get(UseCaseSearchProducts);
      spyOn(spyUseCaseSearchProducts, 'execute').and.returnValue(of({ products: mocksExpectedProductsModel, metadata }));

      component.getProductList(value);

      fixture.whenStable().then(() => {
        expect(component.productsList).toEqual(mocksProductsModel);
      });
    }));
  });

  // Revisar 22-11-2023 OK
  describe('UseCasesearcProductByFacetFilter(filterFacet: IFilterFacetList)', () => {
    it('should call UseCasesearcProductByFacetFilter.execute and update productsList', fakeAsync(() => {
      const paramFaceFilter = {
        "categories": "Media > Books > Print Books"
      };

      const spyUseCasesearcProductByFacetFilter = fixture.debugElement.injector.get(UseCasesearcProductByFacetFilter);
      spyOn(spyUseCasesearcProductByFacetFilter, 'execute').and.returnValue(of(mockProductsModelResponse));

      component.getProductListByFacetFilters(paramFaceFilter as any);
      fixture.whenStable().then(() => {
        expect(spyUseCasesearcProductByFacetFilter.execute).toHaveBeenCalledWith({
          metadata: { products: 0, pages: 1 }, category: 'Media > Books > Print Books',hasMetadata:'y'
        });
        expect(component.productsList.length).toEqual(mockProductsModelResponse.products.length);
        expect(component.productsList).not.toBeNull()
      });
    }));
  });

});
