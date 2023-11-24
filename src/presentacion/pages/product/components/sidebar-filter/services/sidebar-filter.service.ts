import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemFilterSelection } from '../models/item-filter-selection';
import { eNameFacetFilter } from 'src/shared/models/facet-filter-name';
import { FilterFacetKey, IFilterFacetList } from 'src/core/models/filter-facet.models';

@Injectable({
  providedIn: 'root'
})
export class SidebarFilterService {
  private readonly filterStateKey = 'filterState';
  private filterSearchParamsList: IFilterFacetList = Object.assign({});
  // BehaviorSubject to reactively handle state changes
  private stateFacetFilters$ = new BehaviorSubject<ItemFilterSelection>(this.getInitialFilterState());

  constructor() { }

  // Calcula la altura para cada sección del acordeón
  calculateHeight(isOpen: boolean): string {
    return isOpen ? 'auto' : '0';
  }

  private getInitialFilterState(): ItemFilterSelection {
    // Try to retrieve the state from localStorage or return an empty object
    const savedState = localStorage.getItem(this.filterStateKey);
    // this.filterSearchParamsList = {
    //   asinList: new Set<string>,
    //   barcodeList: new Set<string>,
    //   brandList: new Set<string>,
    //   categories: new Set<string>,
    //   manufactureList: new Set<string>,
    //   mnpList: new Set<string>,
    //   nameProductList: new Set<string>,
    // }
    return savedState ? JSON.parse(savedState) : {};
  }

  // Method to update the state and save it in localStorage
  setStateFacetFilters(itemFilterSelection: ItemFilterSelection): void {
    localStorage.setItem(this.filterStateKey, JSON.stringify(itemFilterSelection));
    this.stateFacetFilters$.next(itemFilterSelection); // Update the BehaviorSubject
  }

  // Method to get the current state as an Observable
  getStateFacetFilters(): Observable<ItemFilterSelection> {
    return this.stateFacetFilters$.asObservable();
  }

  getFilterFacet(event: any, nameFacet: string): IFilterFacetList {

    let _nameFacet: string = nameFacet;
    let keyTypeFacet: FilterFacetKey = Object.assign({});

    if (_nameFacet in this.filterSearchParamsList) {
      keyTypeFacet = nameFacet as FilterFacetKey;
      // Ahora puedes usar keyTypeFacet con seguridad
    } else {
      // Manejar el caso en que nameFacet no sea una clave válida
    }

    // console.log(key)
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

    // console.log('serviicio:', this.filterSearchParamsList)
    return this.filterSearchParamsList;;
  }

  deleteFilterFacet(): void {
    this.stateFacetFilters$.next(this.getInitialFilterState());
    // this.getStateFacetFilters().subscribe(value => console.log('valor despues:  ', value))
  }
}
