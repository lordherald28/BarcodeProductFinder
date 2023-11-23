import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAccordionItemModel } from './models/accordion.model';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';
import { UseCaseGetFacetFilter } from 'src/core/use-case/use-case-get-facet-filter';
import { DropDownFilterFacetComponent } from '../dropdown-filter-facet/dropdown-filter-facet.component';
import { eNameFacetFilter } from 'src/shared/models/facet-filter-name';
import { CheckBoxComponent } from 'src/shared/components/check-box/check-box.component';

import { map } from 'rxjs/operators';
import { PROVIDERS_TOKENS, SYSTEM_CONFIG, config_system } from 'src/presentacion/config/system.config';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.css', './stand-component-listbox.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DropDownFilterFacetComponent, CheckBoxComponent],
  providers: [
    {
      provide: PROVIDERS_TOKENS.CONFIG_SYSTEM,
      useValue: SYSTEM_CONFIG
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarFilterComponent implements OnInit {

  hasCheckedMultipleSelection: boolean = false;
  // Todos los filtros seleccionados para la busqueda faceta el se usa para obtener los elementos y renderear el acordion item
  accordionsItemsModel: IAccordionItemModel[] = [];
  categories: string[] = [''];
  barcodeList: string[] = [];
  nameProductList: string[] = [];
  asinList: string[] = [];
  manufactureList: string[] = [];
  brandList: string[] = [];
  mpnList: string[] = [];
  filterSearchParamsList: IFilterFacetList = Object.assign({});
  @Output('emitFacetFiltersParams') emitFacetFiltersParams: EventEmitter<IFilterFacetList> = new EventEmitter();

  constructor(
    private useCaseFacetFilters: UseCaseGetFacetFilter,
    @Inject(PROVIDERS_TOKENS.CONFIG_SYSTEM) public config_system: config_system,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.categories = []
    this.accordionsItemsModel = [
      { description: 'Barcode', hasSelectionMultiple: true, isOpen: false, name: eNameFacetFilter.BARCODE },
      { description: 'Category', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.CATEGORY },
      { description: 'Brand', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.BRAND },
      { description: 'Manufacture', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.MANUFACTURE },
      { description: 'Asin', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.ASIN },
      { description: 'Title (Name)', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.NAME_PRODUCT },
      { description: 'MNP  ', hasSelectionMultiple: false, isOpen: false, name: eNameFacetFilter.MPN },
    ]
  }

  toggleAccordion(accordionName: string): void {
    this.updateListAccordionItems(accordionName);
  }

  // Calcula la altura para cada sección del acordeón
  calculateHeight(isOpen: boolean): string {
    return isOpen ? 'auto' : '0';
  }

  /**
   * La informacion que viene al darclick en el elemento,
   * desde el componente hijo(app-dropdown-filter-facet ) para luego ser enviada por applyFacetFilters al padre
   * 
   * @param event 
   * @param nameFacet 
   */
  getFilterFacet(event: any, nameFacet: string) {
    if (nameFacet === eNameFacetFilter.BARCODE) {
      // se crea el search params
      this.filterSearchParamsList = {
        ...this.filterSearchParamsList,
        barcodeList: event
      }
    } else if (nameFacet === eNameFacetFilter.CATEGORY) {
      this.filterSearchParamsList = {
        ...this.filterSearchParamsList,
        categories: event
      }
    } else if (nameFacet === eNameFacetFilter.MANUFACTURE) {
      this.filterSearchParamsList = {
        ...this.filterSearchParamsList,
        manufactureList: event
      }
    } else if (nameFacet === eNameFacetFilter.BRAND) {
      this.filterSearchParamsList = {
        ...this.filterSearchParamsList,
        brandList: event
      }
    } else if (nameFacet === eNameFacetFilter.NAME_PRODUCT) {
      this.filterSearchParamsList = {
        ...this.filterSearchParamsList,
        nameProductList: event
      }
    } else if (nameFacet === eNameFacetFilter.ASIN) {
      this.filterSearchParamsList = {
        ...this.filterSearchParamsList,
        asinList: event
      }
    } else if (nameFacet === eNameFacetFilter.MPN) {
      this.filterSearchParamsList = {
        ...this.filterSearchParamsList,
        mnpList: event
      }
    }
    // this.cdr.markForCheck();
  }

  onCheckClick(activar: boolean) {
    this.hasCheckedMultipleSelection = activar
  }

  applyFacetFilters() {
    this.emitFacetFiltersParams.emit(this.filterSearchParamsList);
    if (this.config_system.filterState.isMustClear) {
      localStorage.removeItem(this.config_system.filterState.filterState)
    }
    this.cdr.markForCheck();
  }

  updateListAccordionItems(nameAccordionItem: string) {
    this.accordionsItemsModel = this.accordionsItemsModel.map(item => {
      if (item.name === nameAccordionItem) {
        return {
          ...item,
          isOpen: !item.isOpen
        }
      }
      return item
    })
    this.cdr.markForCheck();
  }

  showFacetFiltersListByName(nameFacet: string): string[] {

    if (nameFacet === eNameFacetFilter.BARCODE) {
      this.barcodeList = [];
      this.useCaseFacetFilters.execute()
        .pipe(
          map(response => {
            if (response.barcodeList.size > this.barcodeList.length) {
              return response.barcodeList
            }
            return
          })
        )
        .subscribe(value => {
          value?.forEach(value => {
            this.barcodeList.push(value)
          })
        })
      return this.barcodeList;
    } else if (nameFacet === eNameFacetFilter.CATEGORY) {
      this.categories = [];
      this.useCaseFacetFilters.execute()
        .pipe(
          map(response => {
            if (response.categories.size > this.categories.length) {
              return response.categories
            }
            return
          })
        )
        .subscribe(categories => {
          categories?.forEach(categoria => {
            this.categories.push(categoria)
          })
        })

      return this.categories;

    } else if (nameFacet === eNameFacetFilter.MANUFACTURE) {
      this.manufactureList = [];
      this.useCaseFacetFilters.execute()
        .pipe(
          map(response => {
            if (response.manufactureList.size > this.manufactureList.length) {
              return response.manufactureList
            }
            return
          })
        )
        .subscribe(value => {
          value?.forEach(value => {
            this.manufactureList.push(value)
          })
        })
      return this.manufactureList;

    } else if (nameFacet === eNameFacetFilter.BRAND) {
      this.brandList = [];
      this.useCaseFacetFilters.execute()
        .pipe(
          map(response => {
            if (response.brandList.size > this.brandList.length) {
              return response.brandList
            }
            return
          })
        )
        .subscribe(value => {
          value?.forEach(value => {
            this.brandList.push(value)
          })
        })
      return this.brandList;

    } else if (nameFacet === eNameFacetFilter.NAME_PRODUCT) {
      this.nameProductList = [];
      this.useCaseFacetFilters.execute()
        .pipe(
          map(response => {
            if (response.nameProductList.size > this.nameProductList.length) {
              return response.nameProductList
            }
            return
          })
        )
        .subscribe(value => {
          value?.forEach(value => {
            this.nameProductList.push(value)
          })
        })
      return this.nameProductList;

    } else if (nameFacet === eNameFacetFilter.ASIN) {
      this.asinList = [];
      this.useCaseFacetFilters.execute()
        .pipe(
          map(response => {
            if (response.asinList.size > this.asinList.length) {
              return response.asinList
            }
            return
          })
        )
        .subscribe(value => {
          value?.forEach(value => {
            this.asinList.push(value)
          })
        })
      return this.asinList;

    } else {
      this.mpnList = [];
      this.useCaseFacetFilters.execute()
        .pipe(
          map(response => {
            if (response.mnpList.size > this.mpnList.length) {
              return response.mnpList
            }
            return
          })
        )
        .subscribe(value => {
          value?.forEach(value => {
            this.mpnList.push(value)
          })
        })
      return this.mpnList;
    }
  }

}
