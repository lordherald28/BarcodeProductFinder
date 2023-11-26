import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SearchBoxGeneralComponent } from 'src/shared/components/search-box-general/search-box-general.component';
import { SidebarFilterComponent } from './components/sidebar-filter/sidebar-filter.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { ProductModel } from 'src/core/models/product.model';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';
import { UseCaseSearchProducts } from 'src/core/use-case/use-case-search-products';
import { CoreModule } from 'src/core/core.module';
import { Metadata, SearchParams } from 'src/core/helpers/metadata-products';

import { catchError, debounceTime, delay, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UseCasesearcProductByFacetFilter } from 'src/core/use-case/use-case-search-facet';
import { PaginatorComponent } from 'src/shared/components/paginator/paginator.component';
import { AlertMessageComponent } from 'src/shared/components/alert-message/alert-message.component';
import { IMessages, eIcon, eSeverity } from 'src/core/models/message-notify.models';
import { UseCaseGetMessages } from 'src/core/use-case/use-case-get-messages';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { SidebarComponent } from 'src/shared/components/sidebar/sidebar.component';
import { AccordionComponent } from 'src/shared/components/accordion/accordion.component';
import { DropDownComponent } from 'src/shared/components/drop-down/drop-down.component';
import { IAccordionItemModel } from 'src/shared/models/accordion.model';
import { UseCaseGetFacetFilter } from 'src/core/use-case/use-case-get-facet-filter';
import { ProductServiceComponent } from './service/product.service';
import { FormsModule } from '@angular/forms';
import { eNameFacetFilter } from 'src/shared/models/facet-filter-name';

type SearchParamsKeys = keyof SearchParams;
type SearchParamKeys = keyof SearchParams;

const filterToParamMap: Record<string, SearchParamsKeys> = {
  barcode_number: 'barcode',
  category: 'category',
  brand: 'brand',
  manufacturer: 'manufacture',
  asin: 'asin',
  title: 'title',
  mpn: 'mpn',
  // ... otros mapeos
};
const stringKeys: Set<keyof SearchParams> = new Set([
  'search', 'barcode', 'mpn', 'title', 'manufacture', 'brand', 'asin', 'category', 'hasMetadata', 'cursor', 'key'
]);


@Component({
  selector: 'app-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.css'],
  standalone: true,
  imports: [CommonModule, SearchBoxGeneralComponent, /* SidebarFilterComponent */ AlertMessageComponent, SpinnerComponent, SidebarComponent,
    CardProductComponent, HeaderComponent, CoreModule, PaginatorComponent, AccordionComponent, DropDownComponent, FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PageProductComponent implements OnInit, OnDestroy {


  constructor(
    public readonly useCaseSearchProducts: UseCaseSearchProducts,
    public readonly useCaseSearchFacet: UseCasesearcProductByFacetFilter,
    private readonly useCaseGetMessages: UseCaseGetMessages,
    private readonly serviceProduct: ProductServiceComponent,
    public cdr: ChangeDetectorRef
  ) {


  }

  public isLoading: boolean = false;
  private subs$ = new Array<Subscription>();
  messages: IMessages = {};
  metaDataState: Metadata = {
    pages: 0,
    products: 0
  }
  currentKeyValue: string = '';
  searchParams: SearchParams = {
    metadata: {
      pages: 1,
      products: 0,
    },
    hasMetadata: 'y'
  }
  isSerachGeneral: boolean = false;
  public productsList = new Array<ProductModel>();
  public totalPageNumber: number = 0;
  public currrentPageNumber: number = 1;
  public lastValueSearch: string = '';
  hasResetPagination: boolean = false;
  accordionFilterList = new Array<IAccordionItemModel>();
  public updateChild: boolean = false;
  public accordionForMenuMovil: IAccordionItemModel = { name: 'filters', description: 'Filters', hasSelectionMultiple: false, isOpen: false }
  cleanSelectionFilters: boolean = false;
  private cancelGetData$ = new Observable<boolean>()
  // private cancelGetData$ = new BehaviorSubject<boolean>(false)


  ngOnInit() {

    this.subs$.push(this.useCaseGetMessages.execute().subscribe(messages => {
      this.messages = messages;
      this.cdr.markForCheck();
      //Simular el primer filtro 
      this.accordionFilterList = [
        { description: 'Barcode', hasSelectionMultiple: true, isOpen: false, name: eNameFacetFilter.BARCODE },
        { description: 'Category', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.CATEGORY },
        { description: 'Brand', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.BRAND },
        { description: 'Manufacturer', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.MANUFACTURE },
        { description: 'Asin', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.ASIN },
        { description: 'Title (Name)', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.NAME_PRODUCT },
        { description: 'MNP  ', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.MPN },


      ]
    }));
  }

  getValueChangeInput(value: string): void {
    this.getProductList(value);

    this.cdr.markForCheck();
  }

  getProductList(value: string): void {
    // this.cancelGetData$.next(true)

    //limpiar parametros
    this.retetSearchParams()
    this.currentKeyValue = value;
    this.isSerachGeneral = true;
    this.OnEventPage(1);
    this.hasResetPagination = !this.hasResetPagination;
    this.updateChild = true
    this.cdr.markForCheck();

  }

  retetSearchParams() {
    this.searchParams = {
      ...this.searchParams,
      asin: '',
      barcode: '',
      brand: '',
      category: '',
      manufacture: '',
      mpn: '',
      title: '',

    }
  }

  OnEventPage(event: number): void {

    this.isLoading = true;
    this.messages = {}
    this.cdr.markForCheck();

    this.searchParams = {
      ...this.searchParams,
      key: environment.AuthenticationKey.key,
      metadata: {
        ...this.metaDataState,
        pages: event,
      }
    }
    if (this.isSerachGeneral) {
      this.searchParams = {
        ...this.searchParams,
        search: this.currentKeyValue
      }
    } else {
      this.searchParams = {
        ...this.searchParams,
        search: ''
      }
    }
    const subscription = (this.isSerachGeneral ? this.useCaseSearchProducts.execute(this.searchParams) : this.useCaseSearchFacet.execute(this.searchParams))
      .pipe(
        debounceTime(1500),
        switchMap((result) => of(result)),
        catchError(error => {
          this.isLoading = false;
          return throwError(() => error);
        }),
        delay(4000),
        finalize(() => {
          // console.log('Finalizado')
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe(({ products, metadata }) => {
        if (products.length === 0) {
          this.messages = { detail: 'Not found', icon: eIcon.info, isShow: true, severity: eSeverity.INFO }
          this.cdr.markForCheck();
        }
        this.productsList = products;
        this.metaDataState = metadata;
        this.totalPageNumber = metadata.pages;
        // this.isLoading = false;
        this.hasResetPagination = false;
        this.cleanSelectionFilters = false;

        this.accordionFilterList.forEach(accordion => {
          this.serviceProduct.updateDropDownValues(accordion.name, this.productsList)
        })
        this.retetSearchParams();

        this.cdr.markForCheck();
      });

    // this.retetSearchParams()
    this.subs$.push(subscription);
  }

  testObservable() {
    const test$ = interval(1000).pipe(takeUntil(this.cancelGetData$));
    test$.subscribe(value => console.log(value));
  }

  getValuesForDropDown(accordionName: string) {
    return this.serviceProduct.getValuesForDropDown(accordionName)
  }

  trackByIdFn(index: number, item: any) { return item; }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    })
  }

  OnClickElementDropDown(value: any) {
    console.log(value)
    this.updateSearchParams(value);
  }

  applyFacetFilters() {
    // Limpiar searchParams

    this.searchParams = {
      ...this.searchParams,
    }
    this.isSerachGeneral = false;
    this.OnEventPage(1);
    this.hasResetPagination = !this.hasResetPagination;
    this.cleanSelectionFilters = true;
    this.cdr.markForCheck();
  }

  // updateSearchParams(filterFacet: any): void {
  //   console.log(filterFacet)
  //   if (filterFacet.barcode_number && filterFacet.barcode_number.length > 0) {
  //     this.searchParams.barcode = filterFacet.barcode_number.join(',');
  //   }

  //   if (filterFacet.category && filterFacet.category.length > 0) {
  //     this.searchParams.category = encodeURIComponent(filterFacet.category[0]); // Tomar el primer elemento
  //   }

  //   if (filterFacet.brand && filterFacet.brand.length > 0) {
  //     this.searchParams.brand = encodeURIComponent(filterFacet.brand[0]); // Tomar el primer elemento
  //   }

  //   if (filterFacet[eNameFacetFilter.MANUFACTURE] && filterFacet.manufacturer.length > 0) {
  //     this.searchParams.manufacture = encodeURIComponent(filterFacet.brand[0]); // Tomar el primer elemento
  //   }

  //   if (filterFacet[eNameFacetFilter.ASIN] && filterFacet.asin.length > 0) {
  //     this.searchParams.manufacture = encodeURIComponent(filterFacet.asin[0]); // Tomar el primer elemento
  //   }

  //   if (filterFacet[eNameFacetFilter.MPN] && filterFacet.mpn.length > 0) {
  //     this.searchParams.mpn = encodeURIComponent(filterFacet.mpn[0]); // Tomar el primer elemento
  //   }

  //   if (filterFacet[eNameFacetFilter.NAME_PRODUCT] && filterFacet.title.length > 0) {
  //     this.searchParams.title = encodeURIComponent(filterFacet.title[0]); // Tomar el primer elemento
  //   }
  // }
  updateSearchParams(filterFacet: any): void {
    for (const filterKey in filterFacet) {
      if (filterFacet.hasOwnProperty(filterKey) && filterFacet[filterKey].length > 0) {
        const searchParamKey = filterToParamMap[filterKey];
  
        if (searchParamKey && stringKeys.has(searchParamKey)) {
          // this.searchParams[searchParamKey] = encodeURIComponent(filterFacet[filterKey][0]);
        }
      }
    }
  }
  



  cancelGetData(event: boolean) {

    this.cancelGetData$.subscribe({
      next: (value) => {
        console.log(value)
        // value = true
      }
    }) // Emite true para cancelar la operación
    // Opcional: restablecer para futuras operaciones
    // setTimeout(() => this.cancelGetData$.next(!event), 0);

    this.cdr.markForCheck()

  }



}
