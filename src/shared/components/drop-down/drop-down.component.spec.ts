/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropDownComponent } from './drop-down.component';
import { DropDownService } from './service/drop-down.service';

describe('DropDownComponent', () => {
  let component: DropDownComponent;
  let fixture: ComponentFixture<DropDownComponent>;
  let dropDownService: DropDownService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [ DropDownComponent ]
      providers: [DropDownService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownComponent);
    component = fixture.componentInstance;
    dropDownService = TestBed.inject(DropDownService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('emitFacetFilterSelected', () => {
    it('should toggle the selection of a facet filter', () => {
      const key = 'testKey';
      const facetFilter = 'testFilter';
      component.selectionMultiple = true;
      component.emitFacetFilterSelected(key, facetFilter);
      expect(component.isItemActive[facetFilter]).toBeTrue();
      component.emitFacetFilterSelected(key, facetFilter);
      expect(component.isItemActive[facetFilter]).toBeFalse();
    });

    // Add more tests for different scenarios
  });

  describe('trackByIdFn', () => {
    it('should return the item itself', () => {
      const item = { id: 1, name: 'Test' };
      const result = component.trackByIdFn(0, item);
      expect(result).toBe(item);
    });
  });

  describe('cleanSelectionFacetFilters', () => {
    it('should clear all selections if cleanSelectionFacet is true', () => {
      component.cleanSelectionFacet = true;
      component.isItemActive = {'testFilter': true};
      component.cleanSelectionFacetFilters();
      expect(component.isItemActive).toEqual({});
    });

    // Additional test for when cleanSelectionFacet is false
  });

  describe('getStateFilterByName', () => {
    it('should return true if the name is in the marketListFilterFacet', () => {
      component.marketListFilterFacet = ['item1', 'item2'];
      expect(component.getStateFilterByName('item1')).toBeTrue();
      expect(component.getStateFilterByName('nonExistingItem')).toBeFalse();
    });
  });

});
