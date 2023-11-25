import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidebarFilterComponent } from './sidebar-filter.component';
import { By } from '@angular/platform-browser';
import { CoreModule } from 'src/core/core.module';
import { PROVIDERS_TOKENS, SYSTEM_CONFIG } from 'src/presentacion/config/system.config';

describe('SidebarFilterComponent', () => {
  let component: SidebarFilterComponent;
  let fixture: ComponentFixture<SidebarFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[CoreModule],
      providers: [{
        provide: PROVIDERS_TOKENS.CONFIG_SYSTEM,
        useValue: SYSTEM_CONFIG
      }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle accordion item', () => {

    // Let's assume that the component has an initialized array 'accordionsItemsModel'.
    const itemName = component.accordionsItemsModel[0].name;
    component.toggleAccordion(itemName,'');
    expect(component.accordionsItemsModel[0].isOpen).toBeTrue();

    // Toggle again to close
    component.toggleAccordion(itemName,'');
    expect(component.accordionsItemsModel[0].isOpen).toBeFalse();
  });

  it('should call applyFacetFilters on button click', () => {
    spyOn(component, 'applyFacetFilters');
    const button = fixture.debugElement.query(By.css('.btn-standar-primary')).nativeElement;
    button.click();
    expect(component.applyFacetFilters).toHaveBeenCalled();
  });

});
