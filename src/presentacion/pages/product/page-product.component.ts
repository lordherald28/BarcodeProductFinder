import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchBoxGeneralComponent } from 'src/shared/components/search-box-general/search-box-general.component';
import { SidebarFilterComponent } from './components/sidebar-filter/sidebar-filter.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { ProductModel } from 'src/core/models/product.model';
import { HeaderComponent } from 'src/shared/components/header/header.component';

@Component({
  selector: 'app-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.css'],
  standalone: true,
  imports: [CommonModule, SearchBoxGeneralComponent, SidebarFilterComponent, CardProductComponent, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PageProductComponent implements OnInit {


  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  public productsList = new Array<ProductModel>();

  ngOnInit() {

  }

  getProductsListEmitted(products: ProductModel[]) {
    console.log(products);
    this.productsList = structuredClone(products);
    this.cdr.markForCheck();

  }

}
