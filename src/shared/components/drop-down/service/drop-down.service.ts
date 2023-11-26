
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ItemFilterSelection } from "src/presentacion/pages/product/components/sidebar-filter/models/item-filter-selection";


@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  private readonly filterStateKey = 'filterState';
  private selections: { [key: string]: Set<string> } = {};

  constructor() { }

  toggleSelection(key: string, item: string): void {
    if (!this.selections[key]) {
      this.selections[key] = new Set();
    }
    if (this.selections[key].has(item)) {
      this.selections[key].delete(item);
    } else {
      this.selections[key].add(item);
    }
  }

  getSelections(): { [key: string]: string[] } {
    let selectionsObj: { [key: string]: string[] } = {};
    for (const key in this.selections) {
      selectionsObj[key] = Array.from(this.selections[key]);
    }
    return selectionsObj;
  }

  // Método para limpiar todas las selecciones del facetFiltersList
  clearSelections(): void {
    this.selections = {}; // O la estructura inicial adecuada

  }

}
