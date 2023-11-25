import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Importing the HomeComponent for testing.
import HomeComponent from './home.component';

// Commencing the test suite for HomeComponent.
describe('HomeComponent', () => {
  // Declaring variables for the component and its fixture.
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // Setting up the TestBed configuration asynchronously before each test.
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // Providing the necessary declarations and imports for the test module.
      // declarations: [ HomeComponent ] // Uncomment this line if HomeComponent needs to be declared.
    })
      .compileComponents(); // Compiling components to ensure templates are processed.
  }));

  // Initializing the component and fixture before each test.
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent); // Creating an instance of the component fixture.
    component = fixture.componentInstance; // Assigning the instance of the component for testing.
    fixture.detectChanges(); // Triggering initial data binding and lifecycle hooks.
  });

  // Defining a test case to verify the creation of the component.
  it('should create', () => {
    expect(component).toBeTruthy(); // Checking if the component instance is created successfully.
  });

  // Test case to verify if the component contains a specific link.
  it('should have a link to cors-anywhere.herokuapp.com', () => {
    // Finding the anchor element with a specific href attribute.
    const debugElement: DebugElement = fixture.debugElement;
    const link = debugElement.query(By.css('a[href="https://cors-anywhere.herokuapp.com/"]'));

    // Expecting the link to be present in the template.
    expect(link).toBeTruthy();
    
    // Optionally, you can also check the link text.
    const linkElement: HTMLElement = link.nativeElement;
    expect(linkElement.textContent).toContain('Go to cors-anywhere.herokuapp.com');
  });

});
