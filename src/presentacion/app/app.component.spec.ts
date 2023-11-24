import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { PROVIDERS_TOKENS, SYSTEM_CONFIG } from '../config/system.config';



describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: PROVIDERS_TOKENS.CONFIG_SYSTEM,
          useValue: SYSTEM_CONFIG,
        }
      ],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('ngOnInit should clear localStorage filterState if configured', fakeAsync(() => {
    spyOn(localStorage, 'removeItem');

    app.config_system.filterState.isMustClear = true;
    app.config_system.filterState.filterState = 'testFilterStateKey';

    app.ngOnInit();
    fixture.detectChanges();
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('testFilterStateKey');

    tick(500)
  }));

  it('ngOnInit should not clear localStorage filterState if not configured', () => {
    spyOn(localStorage, 'removeItem');

    app.config_system.filterState.isMustClear = false;

    app.ngOnInit();

    expect(localStorage.removeItem).not.toHaveBeenCalled();
  });

});
