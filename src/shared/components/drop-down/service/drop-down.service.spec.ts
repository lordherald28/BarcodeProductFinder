/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DropDownService } from './drop-down.service';

describe('Service: DropDown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropDownService]
    });
  });

  it('should ...', inject([DropDownService], (service: DropDownService) => {
    expect(service).toBeTruthy();
  }));
});
