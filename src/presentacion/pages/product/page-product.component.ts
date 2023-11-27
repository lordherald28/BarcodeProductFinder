import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SearchBoxGeneralComponent } from 'src/shared/components/search-box-general/search-box-general.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { ProductModel } from 'src/core/models/product.model';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { UseCaseSearchProducts } from 'src/core/use-case/use-case-search-products';
import { CoreModule } from 'src/core/core.module';
import { Metadata, SearchParams } from 'src/core/helpers/metadata-products';
import { catchError, debounceTime, delay, finalize, switchMap, } from 'rxjs/operators';
import { Observable, ReplaySubject, Subscription, of, throwError } from 'rxjs';
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
import { ProductServiceComponent } from './service/product.service';
import { FormsModule } from '@angular/forms';
import { eNameFacetFilter } from 'src/shared/models/facet-filter-name';

type SearchParamsKeys = keyof SearchParams;
const stringKeys: Set<keyof SearchParams> = new Set([
  'search', 'barcode', 'mpn', 'title', 'manufacture', 'brand', 'asin', 'category', 'hasMetadata', 'cursor', 'key'
]);
const filterToParamMap: Record<string, SearchParamsKeys> = {
  barcode_number: 'barcode',
  category: 'category',
  brand: 'brand',
  manufacturer: 'manufacture',
  asin: 'asin',
  title: 'title',
  mpn: 'mpn',

};

@Component({
  selector: 'app-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.css'],
  standalone: true,
  imports: [CommonModule, SearchBoxGeneralComponent, AlertMessageComponent, SpinnerComponent, SidebarComponent,
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
  // En tu componente padre
  @ViewChild(DropDownComponent) dropdownComponentInstance!: DropDownComponent;

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
        { description: 'GEO - GeoLocation  ', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.GEO },


      ]
    }));
  }

  // Add this method in your PageProductComponent
  public verifyIfAnyFilterSelected(searchParams: SearchParams): boolean {
    return this.serviceProduct.verifyisAnyFilterSelected(searchParams);
  }


  // This function retrieves the product list based on the provided value.
  // It clears search parameters, sets the current search value, and triggers a page event.
  // It also updates some component properties and marks for change detection.
  getProductList(value: string): void {
    // Clear any previous data or parameters
    // this.cancelGetData$.next(true)
    this.retetSearchParams();
    this.currentKeyValue = value;
    this.isSerachGeneral = true;
    this.OnEventPage(1);
    this.hasResetPagination = !this.hasResetPagination;
    this.updateChild = true;
    this.cdr.markForCheck();
  }

  // This function is responsible for clearing filters.
  // It resets search parameters, cleans selection filters, and displays a success message.
  clearFIlters() {

    if (this.serviceProduct.verifyisAnyFilterSelected(this.searchParams)) {
      console.log(this.searchParams)
      this.retetSearchParams();
      this.cleanSelectionFilters = true;
      //  this.serviceProduct.removeCollectedValues()
      this.dropdownComponentInstance.cleanSelectionFacetFilters();
      this.cdr.markForCheck();
      this.messages = { detail: 'Filters delete success', icon: eIcon.success, isShow: true, severity: eSeverity.SUCCESS }
    }

  }
  // This function is called when the input value changes.
  // It triggers the product list retrieval and marks for change detection.
  getValueChangeInput(value: string): void {
    this.getProductList(value);
    this.cdr.markForCheck();
  }


  // This function is called when an element in the dropdown is clicked.
  // It updates the search parameters based on the selected value.
  OnClickElementDropDown(value: any) {
    this.updateSearchParams(value);
  }

  // This function is responsible for applying facet filters.
  // It checks if any filters are selected and displays an error message if none are selected.
  // If filters are selected, it triggers a page event, clears filters, and updates component properties.
  applyFacetFilters() {
    if (!this.serviceProduct.verifyisAnyFilterSelected(this.searchParams)) {
      // No filters are selected, display an error message
      this.messages = {
        detail: 'At least one filter must be selected to apply.',
        severity: eSeverity.DANGER,
        isShow: true,
        icon: eIcon.warning
      };
      this.cdr.markForCheck();
      return;
    }

    // At least one filter is selected, proceed with applying filters
    this.isSerachGeneral = false;
    this.OnEventPage(1);
    this.hasResetPagination = !this.hasResetPagination;
    this.cleanSelectionFilters = true;
    this.cdr.markForCheck();
  }

  // This function updates the search parameters based on the selected filter facet.
  updateSearchParams(filterFacet: any): void {
    this.searchParams = this.serviceProduct.transformSelectionsToSearchParams(filterFacet, this.searchParams);
  }

  // This function resets search parameters to their initial state.
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
    };
  }

  // This function is called when a page event occurs (e.g., changing to a different page).
  // It handles the loading state, updates search parameters, and retrieves product data.
  OnEventPage(event: number): void {
    this.isLoading = true;
    this.messages = {};
    this.cdr.markForCheck();

    this.searchParams = {
      ...this.searchParams,
      key: environment.AuthenticationKey.key,
      metadata: {
        ...this.metaDataState,
        pages: event,
      },
    };

    if (this.isSerachGeneral) {
      this.searchParams = {
        ...this.searchParams,
        search: this.currentKeyValue
      };
    } else {
      this.searchParams = {
        ...this.searchParams,
        search: ''
      };
    }

    // Perform the product search and handle the results
    const subscription = (this.isSerachGeneral ? this.useCaseSearchProducts.execute(this.searchParams) : this.useCaseSearchFacet.execute(this.searchParams))
      .pipe(
        debounceTime(500),
        switchMap((result) => of(result)),
        catchError(error => {
          this.isLoading = false;
          return throwError(() => error);
        }),
        delay(500),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe(({ products, metadata }) => {
        if (products.length === 0) {
          this.messages = { detail: 'Not found', icon: eIcon.info, isShow: true, severity: eSeverity.INFO };
          this.cdr.markForCheck();
        }
        this.productsList = products;
        this.metaDataState = metadata;
        this.totalPageNumber = metadata.pages;
        this.hasResetPagination = false;

        // Update dropdown values based on the product list
        this.accordionFilterList.forEach(accordion => {
          this.serviceProduct.updateDropDownValues(accordion.name, this.productsList);
        });

        this.cdr.markForCheck();
      });

    // Push the subscription to the list of subscriptions
    this.subs$.push(subscription);
  }

  // This function gets values for a dropdown based on its accordion name.
  getValuesForDropDown(accordionName: string) {
    return this.serviceProduct.getValuesForDropDown(accordionName);
  }


  trackByIdFn(index: number, item: any) { return item; }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    })
  }



}
