import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ItemFilterSelection } from '../sidebar-filter/models/item-filter-selection';
import { SearchBoxGeneralComponent } from 'src/shared/components/search-box-general/search-box-general.component';
import { SidebarFilterService } from '../sidebar-filter/services/sidebar-filter.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DropDownStateService } from './services/drop-down-state.service'
@Component({
  selector: 'app-dropdown-filter-facet',
  templateUrl: './dropdown-filter-facet.component.html',
  styleUrls: ['./dropdown-filter-facet.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchBoxGeneralComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SidebarFilterService]
})
export class DropDownFilterFacetComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly serviceFacetFilters: SidebarFilterService,
    private filterStateService: DropDownStateService
  ) { }

  private filteredFacetListSubject = new BehaviorSubject<string[]>([]);
filteredFacetList$ = this.filteredFacetListSubject.asObservable(); 
  @Input('facetList') facetList: Array<string> = [];
  @Input('selectionMultiple') selectionMultip: boolean = false;
  @Output('emitSelectedFilter') emitSelectedFilter: EventEmitter<ItemFilterSelection | string> = new EventEmitter();
  isActive: boolean = false;
  filteredFacetList = new Array<string>();
  isItemActive: ItemFilterSelection = {};
  isUserInput = false;
  isExternalUpdate = false;

  hasUserClickInSelectedFacetItem: boolean = false;
  private subs$ = new Subscription();
  savedFilterListFact: any[] = []

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['facetList']) {
      this.isExternalUpdate = true;
      // Actualiza la lista filtrada solo si es un cambio externo
      this.filteredFacetList = [...changes['facetList'].currentValue];
      this.filteredFacetListSubject.next(this.filteredFacetList);
      this.isExternalUpdate = false;
    }
  }


  ngOnInit() {
    this.filteredFacetList = [...this.facetList];
    // this.filteredFacetListSubject.next(this.facetList);

    this.subs$.add(this.serviceFacetFilters.getStateFacetFilters().subscribe(facetFilterState => {
      this.isItemActive = facetFilterState;
      this.filterStateService.updateFilteredList(this.filteredFacetList);
      this.cdr.markForCheck();
    }));

    this.filterStateService.filteredList$.subscribe(filteredFacetList => {
      // Actualizar la vista con la lista filtrada
      // console.log(filteredFacetList)
      this.filteredFacetList = filteredFacetList;
    });
  }

  emitFacetFilterSelected(facetFilter: string) {

    // this.hasUserClickInSelectedFacetItem = true;
    this.cdr.markForCheck()
    // console.log(this.hasUserClickInSelectedFacetItem)
    // Emit filter selection based on multiple selection option
    if (this.selectionMultip) {
      // Toggle the active state of the selected item
      if (facetFilter in this.isItemActive) {
        this.isItemActive[facetFilter] = !this.isItemActive[facetFilter];
      } else {
        this.isItemActive[facetFilter] = true;
      }

      // Filter the object to emit only the elements with true value
      let filteredObject: { [key: string]: any } = {};
      for (let key in this.isItemActive) {
        if (this.isItemActive[key]) {
          filteredObject[key] = this.isItemActive[key];
        }
      }
      this.serviceFacetFilters.setStateFacetFilters(this.isItemActive)
      this.emitSelectedFilter.emit(filteredObject);
      this.cdr.markForCheck();
      return;
    }

    // Reset all elements to false
    for (let item in this.isItemActive) {
      this.isItemActive[item] = false;
    }

    // Set the clicked item to true
    this.isItemActive[facetFilter] = true;
    // this.savedFilterListFact = facetFilter
    this.emitSelectedFilter.emit(facetFilter);
    this.cdr.markForCheck();
  }

  isMatch(facetValue: string, inputValue: string): boolean {
    // Normalize the input and facet value for case-insensitive comparison
    // and replace '&' with 'and' to handle that symbol.
    const normalizedInputValue = inputValue.toLowerCase().replace('&', 'and');
    const normalizedFacetValue = facetValue.toLowerCase().replace('&', 'and');
    // Split the input into categories based on '>', and trim to remove extra spaces
    const categories = normalizedInputValue.split('>').map(s => s.trim());
    // Check if any category is included in the facet value
    return categories.some(category => normalizedFacetValue.includes(category));
  }

  // getValueChangeInput(_value: string): void {
  //   // Establece la bandera a true para indicar que es una entrada del usuario
  //   this.isUserInput = true;
  //   this.filteredFacetList = [...this.facetList.filter(value => this.isMatch(value, _value))];
  //   this.cdr.markForCheck();
  // }

  getValueChangeInput(_value: string): void {
    if (!this.isExternalUpdate) {
      const newFilteredFacetList = this.facetList.filter(value => this.isMatch(value, _value));
      this.filteredFacetListSubject.next(newFilteredFacetList);
      this.filteredFacetList = newFilteredFacetList;
      this.cdr.markForCheck();
    }
  }
  itemActive(item: any) {
    // Check if the item is active
    return this.isItemActive[item]
  }

  trackByIdFn(index: number, item: any) {
    // Function for tracking items by ID, useful for performance optimization
    this.cdr.markForCheck();
    return item;
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe()
  }
}
