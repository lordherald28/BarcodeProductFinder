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

import { catchError, debounceTime, delay, finalize, switchMap } from 'rxjs/operators';
import { Subscription, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UseCasesearcProductByFacetFilter } from 'src/core/use-case/use-case-search-facet';
import { PaginatorComponent } from 'src/shared/components/paginator/paginator.component';
import { AlertMessageComponent } from 'src/shared/components/alert-message/alert-message.component';
import { IMessages, eIcon, eSeverity } from 'src/core/models/message-notify.models';
import { UseCaseGetMessages } from 'src/core/use-case/use-case-get-messages';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';



@Component({
  selector: 'app-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.css'],
  standalone: true,
  imports: [CommonModule, SearchBoxGeneralComponent, SidebarFilterComponent, AlertMessageComponent, SpinnerComponent,
    CardProductComponent, HeaderComponent, CoreModule, PaginatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PageProductComponent implements OnInit, OnDestroy {
  hasResetPagination: boolean = false;


  constructor(
    public readonly useCaseSearchProducts: UseCaseSearchProducts,
    public readonly useCaseSearchFacet: UseCasesearcProductByFacetFilter,
    private readonly useCaseGetMessages: UseCaseGetMessages,
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
  // public messageNotify: IMessages = {}
  public updateChild: boolean = false;

  ngOnInit() {

    this.subs$.push(this.useCaseGetMessages.execute().subscribe(messages => {
      this.messages = messages;
      this.cdr.detectChanges();
    }));
  }

  getValueChangeInput(value: string): void {
    this.getProductList(value);

    this.cdr.markForCheck();
  }

  getProductList(value: string): void {
    //limpiar parametros
    this.retetSearchParams()
    this.currentKeyValue = value;
    this.isSerachGeneral = true;
    this.OnEventPage(1);
    this.hasResetPagination = !this.hasResetPagination;
    this.updateChild = true
    this.cdr.markForCheck();

  }

  getProductListByFacetFilters(filterFacet: IFilterFacetList): void {

    // Limpiar searchParams
    this.retetSearchParams();
    // Aquii se crea los parametros de busqueda facetado
    if (filterFacet.categories) {
      this.searchParams.category = filterFacet.categories as unknown as string
    }
    if (filterFacet.asinList) {
      this.searchParams.asin = filterFacet.asinList as unknown as string
    }
    if (filterFacet.barcodeList) {
      let barcodeList: string[] = [];
      for (const barcode in filterFacet.barcodeList) {
        if (barcode !== '')
          barcodeList.push(barcode)
      }
      this.searchParams.barcode = barcodeList.join(',')
    }
    if (filterFacet.brandList) {
      this.searchParams.brand = filterFacet.brandList as unknown as string
    }
    if (filterFacet.manufactureList) {
      this.searchParams.manufacture = filterFacet.manufactureList as unknown as string
    }
    if (filterFacet.mnpList) {
      this.searchParams.mpn = filterFacet.mnpList as unknown as string
    }
    if (filterFacet.nameProductList) {
      this.searchParams.title = filterFacet.nameProductList as unknown as string
    }

    this.searchParams = {
      ...this.searchParams,
      // key: environment.AuthenticationKey.key,
      // metadata: {
      //   ...this.searchParams.metadata,
      //   pages: 1
      // }
    }
    console.log(this.searchParams)
    this.isSerachGeneral = false;
    this.OnEventPage(1);
    this.hasResetPagination = !this.hasResetPagination;
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
        // ... cualquier operador necesario
        switchMap((result) => of(result)),
        catchError(error => {
          this.isLoading = false;
          return throwError(() => error);
        }),
        delay(3500),
        finalize(() => {
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
        this.cdr.markForCheck();
      });
    // console.log(this.isLoading)

    this.subs$.push(subscription);
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    })
  }

}
