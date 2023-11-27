/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should set inputs correctly', () => {
    component.accordionsItemsModel = { description: 'Test', hasSelectionMultiple: true, isOpen: false, name: 'Test' };
    component.visible = false;
    fixture.detectChanges();
    expect(component.accordionsItemsModel.description).toEqual('Test');
    expect(component.visible).toBeFalse();
  });

  it('should toggle accordion on toggleAccordion call', () => {
    spyOn(component.OnClick, 'emit');
    component.toggleAccordion('more');
    expect(component.expandButtonIcon).toEqual('remove');
    expect(component.accordionsItemsModel.isOpen).toBeTrue();
    expect(component.OnClick.emit).toHaveBeenCalledWith(component.accordionsItemsModel);
  });

  it('should calculate height based on isOpen property', () => {
    component.accordionsItemsModel.isOpen = true;
    expect(component.calculateHeight()).toBeTrue();
    component.accordionsItemsModel.isOpen = false;
    expect(component.calculateHeight()).toBeFalse();
  });

});
