import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchBoxGeneralComponent } from './search-box-general.component';

describe('SearchBoxGeneralComponent', () => {
  let component: SearchBoxGeneralComponent;
  let fixture: ComponentFixture<SearchBoxGeneralComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with an empty searchKeyWord', () => {
    expect(component.formSearch.controls.searchKeyWord.value).toBe('');
  });

  it('should not emit value immediately after search input changes', waitForAsync(() => {
    spyOn(component.emitValueChangeInput, 'emit');

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.emitValueChangeInput.emit).not.toHaveBeenCalledWith('test');
  }));

  it('should unsubscribe from valueChanges on ngOnDestroy', () => {
    spyOn(component.subs$[0], 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subs$[0].unsubscribe).toHaveBeenCalled();
  });


});
