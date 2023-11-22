import { TestBed } from '@angular/core/testing';
import { SidebarFilterService } from './sidebar-filter.service';
import { ItemFilterSelection } from '../models/item-filter-selection';

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
});
