import { Injectable } from '@angular/core';
import { ProductModel } from 'src/core/models/product.model';
import { SearchParams } from 'src/core/helpers/metadata-products';


@Injectable({
  providedIn: 'root',
})
export class ProductServiceComponent {

  private valueForDropDownList: any[] = [];
  private collectedValues = new Map<string, Set<any>>();

  constructor(
  ) { }


  updateDropDownValues(accordionName: string, productsList: ProductModel[]): any[] {
    productsList.forEach(product => {
      let propName = Object.keys(product).find(key =>
        key.toLocaleLowerCase().trim() === accordionName.toLocaleLowerCase()
      );
  
      if (propName) {
        let valuesSet = this.collectedValues.get(propName) || new Set<any>();
        let value = product[propName as keyof typeof product];
  
        if (propName === 'category') {
          // Tratamiento especial para categorías
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
  
    // Retornar el conjunto actualizado de valores como un array
    const valuesSet = this.collectedValues.get(accordionName);
    return valuesSet ? Array.from(valuesSet) : [];
  }
  
  getValuesForDropDown(accordionName: string): any[] {
    // Recupera el Set de valores para el nombre del acordeón dado y lo convierte en un array
    const valuesSet = this.collectedValues.get(accordionName);
    return valuesSet ? Array.from(valuesSet) : [];
  }

  // transformSelectionsToSearchParams(selections: { [key: string]: string[] }): SearchParams {
  //   let searchParams: SearchParams = { metadata: { pages: 1, products: 0 } };

  //   for (const key in selections) {
  //     if (selections.hasOwnProperty(key)) {
  //       switch (key) {
  //         case 'barcode_number':
  //           searchParams.barcode = selections[key];
  //           break;
  //         case 'category':
  //           searchParams.category = selections[key].join(', '); // Si solo necesitas un string
  //           break;
  //         // Agrega casos para otros parámetros según sea necesario
  //         // ...
  //       }
  //     }
  //   }

  //   return searchParams;
  // }


}
