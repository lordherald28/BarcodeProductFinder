import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BehaviorSubject, EMPTY, Observable, Subject, Subscription, concat, from, fromEvent, of } from 'rxjs';
import { catchError, concatMap, debounceTime, distinctUntilChanged, distinctUntilKeyChanged, exhaustMap, filter, finalize, mergeAll, mergeScan, scan, switchMap, takeLast, takeUntil, takeWhile, tap, throttleTime } from 'rxjs/operators'


import { ProductModel } from '../../../core/models/product.model';

import { GeraInfinityScrollDirective } from 'src/shared/directives/infinity-scroll.directive.directive';
import { CoreModule } from 'src/core/core.module';
import { Message } from '../../models/message.models';
import { UseCaseSearchProducts } from 'src/core/use-case/use-case-search-products';
import { SearchParams } from 'src/core/helpers/metadata-products';



@Component({
  selector: 'app-stand-component-listbox',
  templateUrl: './stand-component-listbox.component.html',
  styleUrls: ['./stand-component-listbox.component.css', './input-search.image.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, CoreModule, GeraInfinityScrollDirective, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandComponentListbox implements OnInit, OnDestroy {


  @ViewChild('listBoxRef', { read: ElementRef }) listBoxRef !: ElementRef<any>
  public messages: Message[] = [];

  pageNumber: number = 1;
  @Input('__data') __data = new Array<any>();
  @Output('onSendId') onSendIdPhoto: EventEmitter<ProductModel> = new EventEmitter();
  @Input('disableListBox') disableListBox: boolean = false;
  selectedData: any;
  formSearch = this.fb.group({
    searchKeyWord: new FormControl({ value: '', disabled: false })
  });
  filterValueChange$ = new Observable<ProductModel[]>();
  dataModelObs$ = new Observable<ProductModel[]>();
  listDataForTemplate = new Array<ProductModel>();
  private sub$ = new Array<Subscription>();
  execLoadSpinner: boolean = false;
  isSearch: boolean = false;
  isLoading: boolean = false;

  public searchParamsForProducts: SearchParams = {
    meta_data: {
      pages: 1,
      products: 0,
      current_cursor: 'current_cursor=y',
      next_cursor: 'next_cursor=y'
    },

  }
  private stopPropagationQuery: boolean = false;
  useCaseFlickrPhotos: any;


  constructor(
    private fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly useCaseSearchProducts: UseCaseSearchProducts,

  ) { }


  ngOnInit() {

    this.filterValueChange$ = this.formSearch.controls.searchKeyWord.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((filter) => {
        if (filter && filter.length > 0) {
          this.isSearch = true;
          this.stopPropagationQuery = false;
          if (this.listBoxRef) {
            this.pageNumber = 1;
            this.listDataForTemplate = [];
            this.listBoxRef.nativeElement.scrollTop = 0;
          }
          return this.useCaseSearchProducts.execute(this.searchParamsForProducts).pipe(
            catchError((error: any) => {
              this.messages = [{
                severity: 'error',
                summary: 'Error', detail: `${error.error.error} `
              }]
              return of(new Array<ProductModel>());
            })
          );
        }
        this.isSearch = false;
        this.cdr.markForCheck()
        return of(new Array<ProductModel>);
      }),
    )
    this.dataModelObs$ = this.filterValueChange$;
    this.sub$.push(this.dataModelObs$.subscribe((result) => {
      if (result.length === 0 && this.isSearch) {
        this.messages = [{
          severity: 'info',
          detail: `Lamentablemente, no hemos encontrado resultados que se correspondan con tu búsqueda.`
        }];
        this.listDataForTemplate = [];
        this.cdr.markForCheck();
        return;
      }
      this.listDataForTemplate = result;
      this.messages = []
      this.cdr.markForCheck();
    }));

  }


  trackByIdFn(index: number, item: any) {
    return item.id;
  }

  sendPhotoId(photoId: any) {
    this.onSendIdPhoto.emit(photoId);
  }


  infiniryScrollerDown(): void {

    this.pageNumber++;
    this.sub$.push(
      this.useCaseFlickrPhotos.execute({ keyword: this.formSearch.controls.searchKeyWord.value?.toString() as string, page: this.pageNumber })
        .pipe(
          debounceTime(120),
          catchError((error: any) => {
            console.error('Ha ocurrido un error:', error.error.error);
            this.messages = [{
              severity: 'error',
              summary: 'Resultados', detail: `${error.error.error} `
            }];
            return of(new Array<ProductModel>());
          })
        )
        .pipe(
          switchMap((result) => {
            this.listDataForTemplate = [...this.listDataForTemplate, ...[]];
            if (this.formSearch.controls.searchKeyWord.value?.toString() == '') {
              this.pageNumber = 0;
              this.listDataForTemplate = [];
            }
            this.cdr.markForCheck();
            return of(null); // Devuelve un observable vacío para completar la suscripción
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.sub$.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    })
  }

  loadTest() {
    // console.log('Down')
  }

  loadData() {

    const cancel$ = new Subject<boolean>();

    this.sub$.push(cancel$.subscribe({
      next: (val) => {
        this.stopPropagationQuery = val;
        this.isLoading = val;
        this.cdr.markForCheck();
      }
    }));

    if (this.stopPropagationQuery) {
      return;
    }

    this.isLoading = true;
    this.pageNumber++;

    this.dataModelObs$ = this.useCaseFlickrPhotos.execute({
      keyword: this.formSearch.controls.searchKeyWord.value?.toString() as string,
      page: this.pageNumber
    });

    this.sub$.push(
      this.dataModelObs$
        .pipe(
          filter((val) => {
            if (val.length === 0) {
              cancel$.next(true)
              return false
            }
            return true
          }),
          debounceTime(1500),
          takeUntil(cancel$),
          concatMap(result => of(result)),
        )
        .subscribe({
          next: (val) => {

            this.listDataForTemplate = [...this.listDataForTemplate, ...val]
          },
          complete: () => {
            this.isLoading = false;
            this.cdr.markForCheck();
          }
        }));

  }

}