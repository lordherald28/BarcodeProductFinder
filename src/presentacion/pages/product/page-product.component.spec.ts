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
import { SidebarComponent } from './../../../shared/components/sidebar/sidebar.component';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { eIcon, eSeverity } from 'src/core/models/message-notify.models';
import { mockSearchParamsForsearchProductByKeyword, mockSearchParamsForsearchsearcProductByFacetFilter } from 'src/core/helpers/mocks-objects';
import { DropDownComponent } from 'src/shared/components/drop-down/drop-down.component';

describe('PageProductComponent', () => {
  let component: PageProductComponent;
  let fixture: ComponentFixture<PageProductComponent>;
  let dropDownComponent: DropDownComponent; // Mocked DropDownComponent

  // Mock services and ChangeDetectorRef
  const mockUseCaseSearchProducts = jasmine.createSpyObj('UseCaseSearchProducts', ['execute']);
  const mockUseCaseSearchFacet = jasmine.createSpyObj('UseCasesearcProductByFacetFilter', ['execute']);
  const mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
  const dropDownComponentSpy = jasmine.createSpyObj('DropDownComponent', ['cleanSelectionFacetFilters']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      imports: [CommonModule, SearchBoxGeneralComponent, SidebarComponent, CardProductComponent, HeaderComponent, CoreModule, RouterTestingModule],
      providers: [
        { provide: UseCaseSearchProducts, useValue: mockUseCaseSearchProducts },
        { provide: UseCasesearcProductByFacetFilter, useValue: mockUseCaseSearchFacet },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
        // Provide the mock DropDownComponent
        { provide: DropDownComponent, useValue: dropDownComponentSpy },

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


  describe('applyFacetFilters', () => {
    it('should display an error message when no filters are selected', () => {
      // Arrange
      spyOn(component.cdr, 'markForCheck'); // Espiamos la función markForCheck en el ChangeDetectorRef
      spyOn(component['serviceProduct'], 'verifyisAnyFilterSelected').and.returnValue(false); // Usamos ['serviceProduct'] para acceder a la propiedad privada

      // Act
      component.applyFacetFilters();

      // Assert
      expect(component.messages).toEqual({
        detail: 'At least one filter must be selected to apply.',
        severity: eSeverity.DANGER,
        isShow: true,
        icon: eIcon.warning
      }); // Verificamos que se muestre el mensaje de error esperado
      expect(component.cdr.markForCheck).toHaveBeenCalled(); // Verificamos que markForCheck se llama
    });

    it('should apply facet filters when at least one filter is selected', () => {
      // Arrange
      spyOn(component.cdr, 'markForCheck'); // Espiamos la función markForCheck en el ChangeDetectorRef
      spyOn(component['serviceProduct'], 'verifyisAnyFilterSelected').and.returnValue(true); // Usamos ['serviceProduct'] para acceder a la propiedad privada

      // Act
      component.applyFacetFilters();

      // Assert
      expect(component.isSerachGeneral).toBeFalse(); // Verificamos que isSerachGeneral se establece en false
      expect(component.hasResetPagination).toBeTrue(); // Verificamos que hasResetPagination se establece en true
      expect(component.cleanSelectionFilters).toBeTrue(); // Verificamos que cleanSelectionFilters se establece en true
      expect(component.cdr.markForCheck).toHaveBeenCalled(); // Verificamos que markForCheck se llama
    });
  });




});
