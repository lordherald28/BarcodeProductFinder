import { TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';
import { SidebarFilterService } from './sidebar-filter.service';
import { ItemFilterSelection } from '../models/item-filter-selection';
import { eNameFacetFilter } from 'src/shared/models/facet-filter-name';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';

describe('SidebarFilterService', () => {
  let service: SidebarFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarFilterService);

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return JSON.stringify({ testKey: false }); // Mocked value
    });
    spyOn(localStorage, 'setItem');

    // Set state initial to false
    service.setStateFacetFilters({ testKey: false });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setStateFacetFilters should save the state in localStorage', () => {
    const testState: ItemFilterSelection = { testKey: false };
    service.setStateFacetFilters(testState);
    expect(localStorage.setItem).toHaveBeenCalledWith(service['filterStateKey'], JSON.stringify(testState));
  });

  it('getStateFacetFilters should return an Observable with the current state', (done: DoneFn) => {
    service.getStateFacetFilters().subscribe((state) => {
      expect(state).toEqual({ testKey: false });
      done();
    });
  });

  it('getInitialFilterState should return parsed state from localStorage', () => {
    const state = service['getInitialFilterState']();
    expect(state).toEqual({ testKey: false });
  });

  it(`should correctly handle both true and false values`, () => {
    const spyCalculateHeight = spyOn(service, 'calculateHeight').and.callThrough();
    let height: string = '';

    height = service.calculateHeight(true);
    expect(spyCalculateHeight).toHaveBeenCalledWith(true);
    expect(height).toBe('auto');
    // Resetea el registro de llamadas del espía
    spyCalculateHeight.calls.reset();

    service.calculateHeight(false);
    height = service.calculateHeight(false);
    expect(spyCalculateHeight).toHaveBeenCalledWith(false);
    expect(height).toBe('0');

  });

  it('getFilterFacet should store state params in variable filterSearchParamsList', waitForAsync(() => {

    const mockEvent = 'Home & Garden';  //value come of coomponente child dropdown face filter
    const mockFacetName = 'CATEGORY'; // Current accordion item
    let expectedOutput: IFilterFacetList

    const mockComparateConst = eNameFacetFilter.CATEGORY
    //Tener en cuenta las constantes eNameFacetFilter.BARCODE
    // Espiar el servicio en espera de que sea ejecutado
    const spyGetFilterFacet = spyOn(service, 'getFilterFacet').and.callThrough();

    // Verificar q mockFacetName
    expect(mockComparateConst).toEqual(mockFacetName);

    //Ejecutar servicio : getFilterFacet
    expectedOutput = service.getFilterFacet(mockEvent, mockFacetName) as IFilterFacetList;

    // Verificar q sea llamado el metodo con sus argumentos.
    expect(spyGetFilterFacet).toHaveBeenCalledWith(mockEvent, mockFacetName)

    // Se espera un obejot de tipo IFilterFacetList donde se simulara el valor devuelto como categoria.
    expect(expectedOutput).toEqual(expectedOutput)

  }));

});
