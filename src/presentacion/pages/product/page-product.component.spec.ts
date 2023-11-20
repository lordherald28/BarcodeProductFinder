/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import PageProductComponent from './page-product.component';



describe('ProductComponent', () => {
  let component: PageProductComponent;
  let fixture: ComponentFixture<PageProductComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [PageProductComponent]
      // declarations: [ ProductComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
