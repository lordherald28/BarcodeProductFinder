import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { StandComponentListbox } from './stand-component-listbox.component';
import { UseCaseFlickrPhotos } from 'src/core/use-case/flickr-photos/use-case-flickr-photos';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { CoreModule } from 'src/core/core.module';
import { _mockPhoto, expectedResultOfPhoto } from './mock-object';
import { HttpTestingController } from '@angular/common/http/testing';
import {IModelFlickrPhoto}  from './../../../core/models/photo.model';

describe('StandComponentListbox', () => {
  let standComponentListbox: StandComponentListbox;
  let fixture: ComponentFixture<StandComponentListbox>;
  let useCaseFlickrPhotosSpy: jasmine.SpyObj<UseCaseFlickrPhotos>;


  beforeEach(waitForAsync(() => {
    useCaseFlickrPhotosSpy = jasmine.createSpyObj('UseCaseFlickrPhotos', ['execute']);

    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, CoreModule, ListboxModule, InputTextModule, MessagesModule, ReactiveFormsModule, MessagesModule, InfiniteScrollModule],
      providers: [
        { provide: UseCaseFlickrPhotos, useValue: useCaseFlickrPhotosSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StandComponentListbox);
    standComponentListbox = fixture.componentInstance;
    useCaseFlickrPhotosSpy.execute.and.returnValue(of([])); // Simula una respuesta vacía


  }));


  it('debería configurar las suscripciones en ngOnInit', fakeAsync(() => {
    // No necesitas llamar a fixture.detectChanges() si solo quieres probar ngOnInit
    standComponentListbox.ngOnInit();

    // Veririca que el ngOnInit tenga definina la variable para la captura del los valores del input mediante valueChanges 
    expect(standComponentListbox.filterValueChange$).toBeDefined();

  }));


  it('debería cargar más datos al hacer scroll', fakeAsync(() => {

    
    
    // Simula el incremento del número de página
    const initialPageNumber = standComponentListbox.pageNumber;
    standComponentListbox.pageNumber++;
    fixture.detectChanges();
    
    // Verifica que se incrementa el número de página
    expect(standComponentListbox.pageNumber).toBeGreaterThan(initialPageNumber);
    
    // Debe estar definido el método infinityScrollerDown
    expect(standComponentListbox.infiniryScrollerDown).not.toBeUndefined();

    // Prepara el espía y la respuesta objeto mock
    const _useCaseFlickrPhotos = fixture.debugElement.injector.get(UseCaseFlickrPhotos);
    spyOn(_useCaseFlickrPhotos, "execute").and.returnValue(of([_mockPhoto]));
    
    fixture.whenStable().then(() => {
      
      // Debe de tener un valor el campo input(searchKeyWord) del formulario.
      standComponentListbox.formSearch.controls.searchKeyWord.patchValue('rosa');
      
      // Invoca el método que desencadena la llamada al caso de uso
      standComponentListbox.infiniryScrollerDown();
      
      // Espera a que Angular termine de procesar los cambios
      tick(240);

      // Verifica que el componente se ha actualizado con los datos mock
      expect(standComponentListbox.listDataForTemplate).toEqual([expectedResultOfPhoto]);
    });
  }));

});