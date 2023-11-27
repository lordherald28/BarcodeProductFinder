/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { DropDownService } from './drop-down.service';

describe('Service: DropDown', () => {
  let service: DropDownService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [DropDownService]
    });
  }));

  beforeEach(() => {
    service = TestBed.inject(DropDownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toggleSelection', () => {
    it('should toggle a selection for a given key and item', () => {
      service.toggleSelection('key1', 'item1', true);
      expect(service.getSelections()['key1']).toContain('item1');
      service.toggleSelection('key1', 'item1', true);
      expect(service.getSelections()['key1']).not.toContain('item1');
    });

    it('should clear previous selections when not multiple', () => {
      service.toggleSelection('key1', 'item1', false);
      service.toggleSelection('key1', 'item2', false);
      expect(service.getSelections()['key1']).toContain('item2');
      expect(service.getSelections()['key1']).not.toContain('item1');
    });
  });

  describe('getSelections', () => {
    it('should return the current selections', () => {
      service.toggleSelection('key1', 'item1', true);
      service.toggleSelection('key2', 'item2', true);
      let selections = service.getSelections();
      expect(selections['key1']).toContain('item1');
      expect(selections['key2']).toContain('item2');
    });
  });

  describe('clearSelections', () => {
    it('should clear all selections', () => {
      service.toggleSelection('key1', 'item1', true);
      service.toggleSelection('key2', 'item2', true);
      service.clearSelections();
      expect(service.getSelections()).toEqual({});
    });
  });

});
