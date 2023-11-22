import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemFilterSelection } from '../models/item-filter-selection';

@Injectable({
  providedIn: 'root'
})
export class SidebarFilterService {
  private readonly filterStateKey = 'filterState';

  // BehaviorSubject to reactively handle state changes
  private stateFacetFilters$ = new BehaviorSubject<ItemFilterSelection>(this.getInitialFilterState());

  constructor() { }

  private getInitialFilterState(): ItemFilterSelection {
    // Try to retrieve the state from localStorage or return an empty object
    const savedState = localStorage.getItem(this.filterStateKey);
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
}
