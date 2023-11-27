import { Injectable } from "@angular/core";

/**
 * Injectable service to manage selections for dropdown components.
 * It maintains a record of selections across different dropdown instances.
 */
@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  // Holds the selections for different dropdowns, keyed by a unique identifier.
  private selections: { [key: string]: Set<string> } = {};

  constructor() { }

  /**
   * Toggles the selection of an item for a given key in the dropdown.
   * If multiple selections are not allowed, it clears previous selections.
   * 
   * @param key - The unique identifier for the dropdown.
   * @param item - The item to be selected or deselected.
   * @param isMultiple - Flag indicating if multiple selections are allowed.
   */
  toggleSelection(key: string, item: string, isMultiple: boolean): void {
    if (!this.selections[key]) {
      this.selections[key] = new Set();
    }
    if (!isMultiple) {
      this.selections[key].clear();
    }
    if (this.selections[key].has(item)) {
      this.selections[key].delete(item);
    } else {
      this.selections[key].add(item);
    }
  }

  /**
   * Retrieves the current selections as an object where keys are dropdown identifiers
   * and values are arrays of selected items.
   * 
   * @returns An object representing the current selections.
   */
  getSelections(): { [key: string]: string[] } {
    let selectionsObj: { [key: string]: string[] } = {};
    for (const key in this.selections) {
      selectionsObj[key] = Array.from(this.selections[key]);
    }
    return selectionsObj;
  }

  /**
   * Clears all selections across all dropdowns.
   * Resets the selections object to a new object with no prototype properties.
   */
  clearSelections(): void {
    let filteredObject: { [key: string]: any } = {};
    for (let key in this.selections) {
      if (this.selections[key]) {
        filteredObject[key] = '';
      }
    }
    this.selections = Object.create(null);
  }
  
}
