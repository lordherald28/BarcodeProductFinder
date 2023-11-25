/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DropDownStateService } from './drop-down-state.service';

describe('Service: DropDownState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropDownStateService]
    });
  });

  it('should ...', inject([DropDownStateService], (service: DropDownStateService) => {
    expect(service).toBeTruthy();
  }));
});
