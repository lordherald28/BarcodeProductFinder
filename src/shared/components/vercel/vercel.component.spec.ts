/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VercelComponent } from './vercel.component';

describe('VercelComponent', () => {
  let component: VercelComponent;
  let fixture: ComponentFixture<VercelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VercelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VercelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
