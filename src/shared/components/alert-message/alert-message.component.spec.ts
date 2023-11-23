import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertMessageComponent } from './alert-message.component';

describe('AlertMessageComponent', () => {
    let component: AlertMessageComponent;
    let fixture: ComponentFixture<AlertMessageComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            // declarations: [ AlertMessageComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertMessageComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display a message', () => {
        component.setMessageAlert = 'This is an alert message!';
        fixture.detectChanges();
        expect(compiled.querySelector('.alert-message')?.textContent).toContain('This is an alert message!');
    });

    it('should hide the alert when close button is clicked', () => {
        component.showAlert = true;
        fixture.detectChanges();
        expect(compiled.querySelector('.alert')).not.toBeNull();

        // compiled.querySelector('.alert-close')?.click();
        (compiled.querySelector('.alert-close') as HTMLElement)?.click();

        fixture.detectChanges();

        expect(compiled.querySelector('.alert')).toBeNull();
    });
});
