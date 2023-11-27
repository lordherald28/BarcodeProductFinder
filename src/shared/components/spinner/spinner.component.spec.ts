/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should show spinner when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const spinnerElement = fixture.nativeElement.querySelector('.spinner');
    expect(spinnerElement).not.toBeNull();
  });

  it('should hide spinner when isLoading is false', fakeAsync(() => {
    component.isLoading = false;
    console.log(component.isLoading)
    fixture.detectChanges();
  
    fixture.whenStable().then(() => {
      // fixture.debugElement.query()
      const containerElement = fixture.nativeElement.querySelector('.ng-container');
      expect(containerElement).toBeNull(); // Verifica que el contenedor del spinner no esté en el DOM
    });

    tick(3000)
  }));
  
  it('should emit cancelLoadingSpinner event when onCancelLoading is called', () => {
    spyOn(component.cancelLoadingSpinner, 'emit');
    component.onCancelLoading();
    fixture.detectChanges();

    expect(component.cancelLoadingSpinner.emit).toHaveBeenCalledWith(true);
  });

  it('should set isLoading to false when onCancelLoading is called', () => {
    component.onCancelLoading();
    expect(component.isLoading).toBeFalse();
  });

});
