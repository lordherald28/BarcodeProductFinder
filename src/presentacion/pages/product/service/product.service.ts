import { Injectable } from '@angular/core';
import { ProductModel } from 'src/core/models/product.model';
import { SearchParams } from 'src/core/helpers/metadata-products';
import { Store } from './../../../../core/models/product.model'

// Types and mappings to help manage search parameters
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
  mpn: 'mpn'
};


/**
 * Service for managing products and search functionality.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductServiceComponent {

  constructor(
  ) { }
  private valueForDropDownList: any[] = [];
  private collectedValues = new Map<string, Set<any>>();

  /**
   * Updates dropdown values based on the list of products and the specified accordion name.
   * @param accordionName - The name of the accordion for which values are updated.
   * @param productsList - The list of products to process.
   * @returns An array of updated values for the dropdown.
   */
  updateDropDownValues(accordionName: string, productsList: ProductModel[]): any[] {
    let stores = new Array<Store>()
    productsList.forEach(product => {
      let propName = Object.keys(product).find(key =>
        key.toLocaleLowerCase().trim() === accordionName.toLocaleLowerCase()
      );

      if (propName) {
        let valuesSet = this.collectedValues.get(propName) || new Set<any>();
        let value = product[propName as keyof typeof product];

        // Special treatment for categories
        if (propName === 'category') {
          let categoryParts = value.split(' > ');
          let category = '';
          for (let part of categoryParts) {
            if (category.length > 0) {
              category += ' > ';
            }
            category += part;
            valuesSet.add(category); // Agrega cada nivel de la categoría
          }
        } else {
          // Para otras propiedades
          if (value !== "") {
            valuesSet.add(value);
          }
        }
        this.collectedValues.set(propName, valuesSet);
      }
    });

    const valuesSet = this.collectedValues.get(accordionName);
    return valuesSet ? Array.from(valuesSet) : [];
  }

  /**
   * Retrieves values for the dropdown based on the accordion name.
   * @param accordionName - The name of the accordion.
   * @returns An array of values for the dropdown.
   */
  getValuesForDropDown(accordionName: string): any[] {
    // Recupera el Set de valores para el nombre del acordeón dado y lo convierte en un array
    const valuesSet = this.collectedValues.get(accordionName);
    return valuesSet ? Array.from(valuesSet) : [];
  }

  /**
  * Transforms the selected filter facets into search parameters.
  * @param filterFacet - The selected filter facets.
  * @param searchParams - The search parameters object.
  * @returns The updated search parameters object.
  */
  transformSelectionsToSearchParams(filterFacet: any, searchParams: SearchParams): SearchParams {
    // let searchParams: SearchParams = { metadata: { pages: 1, products: 0 } };

    for (const filterKey in filterFacet) {
      if (filterFacet.hasOwnProperty(filterKey) && filterFacet[filterKey].length > 0) {
        const searchParamKey = filterToParamMap[filterKey];

        // Handle the special case for 'barcode'
        if (searchParamKey === 'barcode') {
          searchParams.barcode = Array.isArray(filterFacet[filterKey]) ?
            filterFacet[filterKey].map((item: string | number | boolean) => encodeURIComponent(item)) :
            encodeURIComponent(filterFacet[filterKey][0]);
        } else if (searchParamKey && searchParamKey !== 'metadata' && stringKeys.has(searchParamKey)) {
          // Handle all other properties expecting a string
          searchParams[searchParamKey] = encodeURIComponent(filterFacet[filterKey][0]);
        }
      }
    }

    return searchParams;
  }

  /**
    * Verifies if any filter is selected in the search parameters.
    * @param searchParams - The search parameters object.
    * @returns true if any filter is selected, otherwise false.
    */
  verifyisAnyFilterSelected(searchParams: SearchParams): boolean {
    // Verificar que al menos un filtro esté seleccionado en searchParams
    let isAnyFilterSelected = false;
    for (const key in searchParams) {
      // Asegúrate de que key es realmente una clave de SearchParams
      if (key !== 'metadata')
        if (key !== 'hasMetadata')
          if (key !== 'cursor')
            if (key !== 'key')
              if (key !== 'search')
                if (key as keyof SearchParams) {
                  const value = searchParams[key as keyof SearchParams];
                  if (value && ((Array.isArray(value) && value.length > 0) || (typeof value === 'string' && value.trim() !== ''))) {
                    isAnyFilterSelected = true;
                    break;
                  }
                }
    }
    return isAnyFilterSelected;
  }

  /**
  * Clears all collected values for dropdown lists.
  */
  removeCollectedValues() {
    this.collectedValues.clear()
  }

}
