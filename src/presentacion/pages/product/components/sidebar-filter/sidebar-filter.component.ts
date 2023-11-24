import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAccordionItemModel } from './models/accordion.model';
import { IFilterFacetList } from 'src/core/models/filter-facet.models';
import { UseCaseGetFacetFilter } from 'src/core/use-case/use-case-get-facet-filter';
import { DropDownFilterFacetComponent } from '../dropdown-filter-facet/dropdown-filter-facet.component';
import { eNameFacetFilter } from 'src/shared/models/facet-filter-name';
import { CheckBoxComponent } from 'src/shared/components/check-box/check-box.component';
import { IMessages, eIcon, eSeverity } from 'src/core/models/message-notify.models';

import { map } from 'rxjs/operators';
import { PROVIDERS_TOKENS, SYSTEM_CONFIG, config_system } from 'src/presentacion/config/system.config';
import { SidebarFilterService } from './services/sidebar-filter.service';
import { AlertMessageComponent } from 'src/shared/components/alert-message/alert-message.component';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.css', './stand-component-listbox.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DropDownFilterFacetComponent, CheckBoxComponent, AlertMessageComponent],
  providers: [
    {
      provide: PROVIDERS_TOKENS.CONFIG_SYSTEM,
      useValue: SYSTEM_CONFIG
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarFilterComponent implements OnInit, OnChanges {
  messagesAlert: IMessages = {};

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
  @Input() eventPage: boolean = false;
  isAnyFilterSelected: boolean = false;

  constructor(
    private useCaseFacetFilters: UseCaseGetFacetFilter,
    @Inject(PROVIDERS_TOKENS.CONFIG_SYSTEM) public config_system: config_system,
    private readonly cdr: ChangeDetectorRef,
    private readonly sidebarFilterService: SidebarFilterService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.eventPage)
    // if(this.eventPage){
    //   this.showFacetFiltersListByName(eNameFacetFilter.CATEGORY)
    // }
    // this.cdr.markForCheck()
  }
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
    return this.sidebarFilterService.calculateHeight(isOpen)
  }

  /**
   * La informacion que viene al darclick en el elemento,
   * desde el componente hijo(app-dropdown-filter-facet ) para luego ser enviada por applyFacetFilters al padre
   * 
   * @param event 
   * @param nameFacet 
   */

  getFilterFacet(event: any, nameFacet: string) {

    this.filterSearchParamsList = this.sidebarFilterService.getFilterFacet(event, nameFacet) as IFilterFacetList
    this.cdr.markForCheck();
  }


  onCheckClick(activar: boolean) {
    this.hasCheckedMultipleSelection = activar
  }

  applyFacetFilters() {
    console.log(this.filterSearchParamsList)
    // console.log(Object.values(this.filterSearchParamsList).length)
    if (Object.values(this.filterSearchParamsList).length ===  0) {
      this.messagesAlert = { detail: 'Al menos debe seleccionar un filtro', severity: eSeverity.DANGER, isShow: true ,icon:eIcon.warning};
      return;
    }


    // console.log('antes:', this.filterSearchParamsList)
    this.filterSearchParamsList = {
      ...this.filterSearchParamsList,

    }
    this.emitFacetFiltersParams.emit(this.filterSearchParamsList);
    if (this.config_system.filterState.isMustClear) {
      localStorage.removeItem(this.config_system.filterState.filterState);
      this.filterSearchParamsList = Object.assign({});
      // console.log('des[uess]:', this.filterSearchParamsList)
      this.sidebarFilterService.deleteFilterFacet();
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
    this.useCaseFacetFilters.execute()
      .pipe(
        map(response => {
          switch (nameFacet) {
            case eNameFacetFilter.BARCODE:
              return Array.from(response.barcodeList || []);
            case eNameFacetFilter.CATEGORY:
              return Array.from(response.categories || []);
            case eNameFacetFilter.MANUFACTURE:
              return Array.from(response.manufactureList || []);
            case eNameFacetFilter.BRAND:
              return Array.from(response.brandList || []);
            case eNameFacetFilter.NAME_PRODUCT:
              return Array.from(response.nameProductList || []);
            case eNameFacetFilter.ASIN:
              return Array.from(response.asinList || []);
            case eNameFacetFilter.MPN:
              return Array.from(response.mnpList || []);
            default:
              return [];
          }
        })
      )
      .subscribe(list => {
        switch (nameFacet) {
          case eNameFacetFilter.BARCODE:
            this.barcodeList = list;
            break;
          case eNameFacetFilter.CATEGORY:
            // console.log(list)
            this.categories = list;
            break;
          case eNameFacetFilter.MANUFACTURE:
            this.manufactureList = list;
            break;
          case eNameFacetFilter.BRAND:
            this.brandList = list;
            break;
          case eNameFacetFilter.NAME_PRODUCT:
            this.nameProductList = list;
            break;
          case eNameFacetFilter.ASIN:
            this.asinList = list;
            break;
          case eNameFacetFilter.MPN:
            this.mpnList = list;
            break;
        }
        this.cdr.markForCheck(); // Notificar a Angular para la detección de cambios
      });

    // Devuelve la lista correspondiente
    switch (nameFacet) {
      case eNameFacetFilter.BARCODE:
        return this.barcodeList;
      case eNameFacetFilter.CATEGORY:
        return this.categories;
      case eNameFacetFilter.MANUFACTURE:
        return this.manufactureList;
      case eNameFacetFilter.BRAND:
        return this.brandList;
      case eNameFacetFilter.NAME_PRODUCT:
        return this.nameProductList;
      case eNameFacetFilter.ASIN:
        return this.asinList;
      case eNameFacetFilter.MPN:
        return this.mpnList;
      default:
        return [];
    }
  }

}
