import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchBoxGeneralComponent } from 'src/shared/components/search-box-general/search-box-general.component';
import { SidebarFilterComponent } from './components/sidebar-filter/sidebar-filter.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { ProductModel } from 'src/core/models/product.model';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';
import { UseCaseSearchProducts } from 'src/core/use-case/use-case-search-products';
import { CoreModule } from 'src/core/core.module';
import { SearchParams } from 'src/core/helpers/metadata-products';

import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { EMPTY, Subscription, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UseCasesearcProductByFacetFilter } from 'src/core/use-case/use-case-search-facet';
import { PaginatorComponent } from 'src/shared/components/paginator/paginator.component';
import { EventPage } from 'src/shared/models/paginator.models';


@Component({
  selector: 'app-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.css'],
  standalone: true,
  imports: [CommonModule, SearchBoxGeneralComponent, SidebarFilterComponent, CardProductComponent, HeaderComponent, CoreModule,PaginatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PageProductComponent implements OnInit {



  constructor(
    private readonly UseCaseSearchProducts: UseCaseSearchProducts,
    private readonly useCaseSearchFacet: UseCasesearcProductByFacetFilter,
    public cdr: ChangeDetectorRef
  ) { }

  private subs$ = new Array<Subscription>();

  searchParams: SearchParams = {
    meta_data: {
      pages: 1,
      products: 0,
      cursor: 'y',
      metadata: 'y'
    }
  }
  public productsList = new Array<ProductModel>();

  ngOnInit() {

  }

  getValueChangeInput(value: string): void {
    this.getProductList(value);
    this.cdr.markForCheck();
  }

  getProductList(value: string): void {
    this.searchParams = {
      ...this.searchParams,
      search: value,
      key: environment.AuthenticationKey.key
    }
    this.UseCaseSearchProducts.execute(this.searchParams)
      .pipe(
        switchMap((result) => {
          this.cdr.markForCheck();
          return of(result)
        })
      )
      .subscribe((result: ProductModel[]) => {
        this.productsList = result
        this.cdr.markForCheck();
      })
  }

  
  getProductListByFacetFilters(filterFacet: IFilterFacetList): void {
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
    // console.log(this.searchParams)

    //Enviar la informacion 
    this.searchParams.search = '';
    this.subs$.push(
      this.useCaseSearchFacet.execute(this.searchParams).pipe(
        debounceTime(1000),
        switchMap((result) => {
          this.cdr.markForCheck();
          return of(result)
        }),
        catchError(async (error) => console.log(error))
      )
        .subscribe(result => {
          if (result && result.length > 0) {
            this.retetSearchParams();
            this.productsList = result;
          }
          this.cdr.markForCheck();
        })
    );
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

  OnEventPage(event:number):void{
    console.log(event)
  }

}
