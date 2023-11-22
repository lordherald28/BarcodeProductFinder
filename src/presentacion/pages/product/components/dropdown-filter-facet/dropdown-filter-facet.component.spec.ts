import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropDownFilterFacetComponent } from './dropdown-filter-facet.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBoxGeneralComponent } from 'src/shared/components/search-box-general/search-box-general.component';
import { SidebarFilterService } from '../sidebar-filter/services/sidebar-filter.service';

describe('DropDownFilterFacetComponent', () => {
  let component: DropDownFilterFacetComponent;
  let fixture: ComponentFixture<DropDownFilterFacetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, SearchBoxGeneralComponent],
      providers: [SidebarFilterService]

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownFilterFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit facet filter selection for single selection', () => {
    spyOn(component.emitSelectedFilter, 'emit'); // Spy on the emitSelectedFilter event
    const facetValue = 'Electronics';
    component.selectionMultip = false;
    component.emitFacetFilterSelected(facetValue);

    // Expect that the emitSelectedFilter event was called with the facetValue
    expect(component.emitSelectedFilter.emit).toHaveBeenCalledWith(facetValue);
  });

  it('should toggle facet filter selection for multiple selection', () => {
    spyOn(component.emitSelectedFilter, 'emit'); // Spy on the emitSelectedFilter event
    const facetValue = 'Electronics';
    component.selectionMultip = true;
    component.isItemActive = {}; // Clear active items
    component.emitFacetFilterSelected(facetValue);

    // Expect that the emitSelectedFilter event was called with the updated active items
    expect(component.emitSelectedFilter.emit).toHaveBeenCalledWith({ [facetValue]: true });
  });

  it('should match facet values with input value', () => {
    const facetValue = 'Home & Garden > Decor';
    const inputValue = 'home';
    const result = component.isMatch(facetValue, inputValue);

    // Expect that the facetValue matches the inputValue (case-insensitive)
    expect(result).toBe(true);
  });

  it('should filter facet list based on input value', () => {
    component.facetList = ['Home & Garden > Decor', 'Electronics', 'Books'];
    component.getValueChangeInput('home');
    const filteredList = component.filteredFacetList;

    // Expect that the filtered list contains only matching values
    expect(filteredList).toEqual(['Home & Garden > Decor']);
  });

  it('should return correct item active status', () => {
    const facetValue = 'Electronics';
    component.isItemActive = { [facetValue]: true };

    // Expect that itemActive function returns true for the active item
    expect(component.itemActive(facetValue)).toBe(true);
  });
});
