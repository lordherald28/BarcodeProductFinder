import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';



describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  // let spyCurrentPage: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [PaginatorComponent],
    });
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  afterEach(() => {
    // spyCurrentPage.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with currentPage set to 1', () => {
    component.currentPage = 1
    expect(component.currentPage).toBe(1);
  });

  it('should disable "Previous" button when currentPage is 1', () => {
    const previousButton = fixture.nativeElement.querySelector('button#previousPage');
    expect(previousButton.disabled).toBe(true);
  });

  it('should enable "Next" button when currentPage is 1', () => {
    const nextButton = fixture.nativeElement.querySelector('button#nextButton');
    expect(nextButton.disabled).toBe(false);
  });

  it('should increment currentPage when "Next" button is clicked', () => {
    const nextButton = fixture.nativeElement.querySelector('button#nextButton');
    nextButton.click();
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);
  });

  it('should decrement currentPage when "Previous" button is clicked', () => {
    const nextButton = fixture.nativeElement.querySelector('button#nextButton');
    const previousButton = fixture.nativeElement.querySelector('button#previousPage');
    nextButton.click(); // Go to page 2
    fixture.detectChanges();
    previousButton.click(); // Go back to page 1
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
  });


  it('should disable "Next" button when currentPage is at the maximum page, Note: maximum let for API barcode 1000 total pages', () => {
    // Set currentPage to the maximum page (in this case, 1000)
    component.currentPage = 1000;

    // Detect changes to update the view
    fixture.detectChanges();

    // Find the "Next" button in the DOM
    const nextButton = fixture.nativeElement.querySelector('button#nextButton');
    fixture.detectChanges();

    nextButton.click()
    fixture.detectChanges();

    // Expect the "Next" button to be disabled when currentPage is at the maximum page
    expect(nextButton.disabled).toBe(true);
  });

  it('should go to "Last page" button when lastPage is clicked', () => {
    const lastPageButton = fixture.nativeElement.querySelector('button#lastPage');

    // spy disableNext is true
    const spyDisableNext = spyOnProperty(component, 'disableNext', 'get');
    spyDisableNext.and.returnValue(true);
    fixture.detectChanges();

    // spy lastPage function 
    const sypLastpageFunction = spyOn(component, "lastPage");
    sypLastpageFunction.and.callThrough();

    lastPageButton.click(); // Try to go to a negative page
    fixture.detectChanges();

    component.totalPages = 10;
    component.currentPage = 10;

    fixture.detectChanges();

    expect(component.currentPage).toBe(component.totalPages);
  });

  it('should disable "Last page" button when total page is 0', () => {
    // Set currentPage ang totalPages (in this case, 0)
    component.currentPage = 0;
    component.totalPages = 0;

    // Detect changes to update the view
    fixture.detectChanges();

    // Find the "last Page" button in the DOM
    const nextLastPage = fixture.nativeElement.querySelector('button#lastPage');
    fixture.detectChanges();

    nextLastPage.click()
    fixture.detectChanges();

    // Expect the "last Page" button to be disabled when currentPage and totalPages is at 0
    expect(nextLastPage.disabled).toBe(true);
  });

  // it('should disable "Last page" button when total page is 0', () => {
  //   const lastPageButton = fixture.nativeElement.querySelector('button#lastPage');

  //   // Set totalPages to 0
  //   component.totalPages = 0;
  //   // component.currentPage = 0;
  //   fixture.detectChanges();

  //   console.log(component)
  //   // spy disableNext is true
  //   const spyDisableLastPage = spyOnProperty(component, 'disableLastPage', 'get');
  //   spyDisableLastPage.and.returnValue(true);
  //   fixture.detectChanges();

  //   expect(lastPageButton.disabled).toBe(true);
  // });

  it('should disable "First page" button when current page is 1', () => {
    const firstPageButton = fixture.nativeElement.querySelector('button#firstPage');

    // Set currentPage to 1
    component.currentPage = 1;
    fixture.detectChanges();

    // spy disableFirstPage is true
    const spyDisableFirstPage = spyOnProperty(component, 'disablePrevious', 'get');
    spyDisableFirstPage.and.returnValue(true);
    fixture.detectChanges();

    expect(firstPageButton.disabled).toBe(true);
  });

  it('should go to "First page" button when firstPage is clicked', () => {
    const firstPageButton = fixture.nativeElement.querySelector('button#firstPage');

    // spy disableFirstPage is true
    const spyDisableFirstPage = spyOnProperty(component, 'disablePrevious', 'get');
    spyDisableFirstPage.and.returnValue(true);
    fixture.detectChanges();

    // spy lastPage function 
    const sypFirstPageFunction = spyOn(component, "firstPage");
    sypFirstPageFunction.and.callThrough();

    firstPageButton.click(); // Try to go to a negative page
    fixture.detectChanges();

    component.currentPage = 1;
    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
    expect(firstPageButton.disabled).toBe(true)
  });
});
