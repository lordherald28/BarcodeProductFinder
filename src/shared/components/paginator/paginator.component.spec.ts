import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [PaginatorComponent],
    });
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with currentPage set to 1', () => {
    expect(component.currentPage).toBe(1);
  });

  it('should disable "Previous" button when currentPage is 1', () => {
    const previousButton = fixture.nativeElement.querySelector('button:nth-child(1)');
    expect(previousButton.disabled).toBe(true);
  });

  it('should enable "Next" button when currentPage is 1', () => {
    const nextButton = fixture.nativeElement.querySelector('button:nth-child(3)');
    expect(nextButton.disabled).toBe(false);
  });

  it('should increment currentPage when "Next" button is clicked', () => {
    const nextButton = fixture.nativeElement.querySelector('button:nth-child(3)');
    nextButton.click();
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);
  });

  it('should decrement currentPage when "Previous" button is clicked', () => {
    const nextButton = fixture.nativeElement.querySelector('button:nth-child(3)');
    const previousButton = fixture.nativeElement.querySelector('button:nth-child(1)');
    nextButton.click(); // Go to page 2
    fixture.detectChanges();
    previousButton.click(); // Go back to page 1
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
  });

  it('should disable "Next" button when currentPage is at the maximum page', () => {
    // Set currentPage to the maximum page (in this case, 10)
    component.currentPage = 129589;

    // Detect changes to update the view
    fixture.detectChanges();

    // Find the "Next" button in the DOM
    const nextButton = fixture.nativeElement.querySelector('button#nextButton');
    fixture.detectChanges();

    // Expect the "Next" button to be disabled when currentPage is at the maximum page
    expect(nextButton.disabled).toBe(true);
  });

  it('should not decrement currentPage below 1', () => {
    const previousButton = fixture.nativeElement.querySelector('button:nth-child(1)');
    previousButton.click(); // Try to go to a negative page
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
  });
});
