import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { map, switchMap, catchError, debounceTime, distinctUntilChanged, tap, } from 'rxjs/operators';
import { CoreModule } from 'src/core/core.module';
import { SearchParams } from 'src/core/helpers/metadata-products';
import { ProductModel } from 'src/core/models/product.model';
import { UseCaseSearchProducts } from 'src/core/use-case/use-case-search-products';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-box-general',
  templateUrl: './search-box-general.component.html',
  styleUrls: ['./search-box-general.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CoreModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxGeneralComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private useCaseSearchProduct: UseCaseSearchProducts
  ) { }

  filters = {
    brand: false,
  };
  selectedBrand: string = '';
  searchType: string = '';
  searchQuery: string = '';
  products = [];
  formSearch = this.fb.group({
    searchKeyWord: new FormControl({ value: '', disabled: false })
  });
  filterValueChange$ = new Observable<ProductModel[]>();
  searchParams: SearchParams = {
    meta_data: {
      pages: 1,
      products: 0,
      cursor: 'y',
      metadata: 'y'
    }
  }
  subs$ = new Array<Subscription>();
  @Output('emitProducsList')
  emitProducsList: EventEmitter<ProductModel[]> = new EventEmitter();

  toggleFilter(filterKey: string) {
    // this.filters[filterKey] = !this.filters[filterKey];
  }

  search() {
    // Implementa la lógica de búsqueda aquí
  }


  ngOnInit() {
    this.filterValueChange$ = this.formSearch.controls.searchKeyWord.valueChanges.pipe(
      debounceTime(1000),
      tap(console.log),
      distinctUntilChanged(),
      switchMap((filter) => {
        if (filter && filter.length > 0) {
          this.searchParams = {
            ...this.searchParams,
            search: filter,
            key: environment.AuthenticationKey.key
          }
          return this.useCaseSearchProduct.execute(this.searchParams).pipe(
            catchError((error: any) => {
              // this.messages = [{
              //   severity: 'error',
              //   summary: 'Error', detail: `${error.error.error} `
              // }]
              return of(new Array<ProductModel>());
            })
          );
        }
        // this.isSearch = false;
        this.cdr.markForCheck();
        return of(new Array<ProductModel>);
      }),
    );

    this.subs$.push(
      this.filterValueChange$.subscribe(response => {
        console.log('response from search box-general:', response)
        this.emitProducsList.emit(response);
        this.cdr.markForCheck();
      })
    )

  }


  ngOnDestroy(): void {
    this.subs$.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    })
  }
}
