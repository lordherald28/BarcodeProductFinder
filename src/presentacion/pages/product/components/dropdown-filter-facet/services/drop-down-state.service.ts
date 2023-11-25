import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropDownStateService {

  constructor() { }
  private filteredListSubject = new BehaviorSubject<string[]>([]);
  filteredList$ = this.filteredListSubject.asObservable();

  updateFilteredList(newList: string[]) {
    this.filteredListSubject.next(newList);
  }
  
}



