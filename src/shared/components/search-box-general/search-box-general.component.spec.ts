import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchBoxGeneralComponent } from './search-box-general.component';

describe('SearchBoxGeneralComponent', () => {
  let component: SearchBoxGeneralComponent;
  let fixture: ComponentFixture<SearchBoxGeneralComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [SearchBoxGeneralComponent],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value when search input changes', waitForAsync(() => {
    spyOn(component.emitValueChangeInput, 'emit');

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.emitValueChangeInput.emit).toHaveBeenCalledWith('test');
    });
  }));

});
