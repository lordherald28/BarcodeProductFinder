import { ComponentFixture, TestBed, async, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { AlertMessageComponent } from './alert-message.component';
import { eIcon, eSeverity } from 'src/core/models/message-notify.models';

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

    // it('should display a message', fakeAsync(() => {
    //     component.message = {
    //         detail: 'This is an alert message!',
    //         icon: eIcon.info,
    //         isShow: true,
    //         severity: eSeverity.INFO
    //     };
    //     fixture.detectChanges();
    //     // let messageElement :HTMLElement | any
    //    const messageElement = compiled.querySelector('.ng-container#content-message') as HTMLElement;
    //     // fixture.detectChanges();
    //     messageElement.innerText = component.message.detail as string
    //     fixture.detectChanges();

    //     // fixture.whenStable().then(() => {
    //         expect(messageElement).toBeTruthy();
    //     // });
    //     expect(messageElement.innerHTML).toContain('This is an alert message!');
    //     tick(3000)
    // }));

    it('should hide the alert when close button is clicked', fakeAsync(() => {

        component.message = {
            ...component.message,
            isShow: true
        };
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(compiled.querySelector('.ng-container#content-alert')).not.toBeNull();

            (compiled.querySelector('.ng-container#alert-close') as HTMLElement)?.click();
            fixture.detectChanges();
            
        })
        expect(compiled.querySelector('.alert')).toBeNull();
        tick(3000)
    }));

});
