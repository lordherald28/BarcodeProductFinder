import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckBoxComponent } from './check-box.component';
import { By } from '@angular/platform-browser';

describe('CheckBoxComponent', () => {
  let component: CheckBoxComponent;
  let fixture: ComponentFixture<CheckBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [CheckBoxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on checkbox click', () => {
    spyOn(component.OnClick, 'emit');

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    checkbox.click();
    fixture.detectChanges();

    expect(component.OnClick.emit).toHaveBeenCalledWith(component.isChecked);
  });

  it('should toggle isChecked on checkbox click', () => {
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    expect(component.isChecked).toBe(false); // default value should be false
  
    checkbox.click();
    fixture.detectChanges();
  
    expect(component.isChecked).toBe(true); // should toggle to true after click
  });
  

});
