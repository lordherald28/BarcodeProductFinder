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

    //24-11-2023 revisar
    // it('should display a message', waitForAsync(() => {
    //     component.message = {
    //         detail: 'This is an alert message!',
    //         icon: eIcon.info,
    //         isShow: true,
    //         severity: eSeverity.INFO
    //     };

    //     // Detecta los cambios para actualizar la vista
    //     fixture.detectChanges(); 

    //     // Espera a que el fixture se estabilice después de los cambios detectados
    //     fixture.whenStable().then(() => {
    //         // Utiliza el selector para encontrar el mensaje en el DOM
    //         const messageElement = compiled.querySelector('span#messagesId') as HTMLElement;
    //         const classMessageContent = compiled.querySelector('.alert') as HTMLElement;
    //         messageElement.innerHTML='This is an alert message!'
    //         console.log("messageElement:    ",messageElement.innerHTML)
    //         console.log("classMessageContent:    ",messageElement)
    //         fixture.detectChanges();
    //         // Verifica que el elemento exista y que contenga el texto esperado
    //         expect(messageElement).toBeTruthy(); 
    //         expect(messageElement.innerHTML).toContain('This is an alert message!');
    //     });
    // }));

    // it('should hide the alert when close button is clicked', waitForAsync(() => {
    //     console.log(component.message)
    //     component.message = {
    //         ...component.message,
    //         isShow: true
    //     };
    //     fixture.detectChanges(); // Actualiza el DOM con los nuevos datos
    //     console.log(component.message)

    //     fixture.whenStable().then(() => {
    //         expect(compiled.querySelector('.alert')).not.toBeNull(); // Verifica que el alerta se muestre inicialmente

    //         // Simula un clic en el botón de cierre
    //         (compiled.querySelector('.alert-close') as HTMLElement)?.click();
    //         fixture.detectChanges(); // Actualiza el DOM después del clic

    //         // Verifica que el alerta se haya ocultado
    //         expect(compiled.querySelector('.alert')).toBeNull();

    //     })
    // }));

});
