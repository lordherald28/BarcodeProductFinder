import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ItemFilterSelection } from '../sidebar-filter/models/item-filter-selection';
import { SearchBoxGeneralComponent } from 'src/shared/components/search-box-general/search-box-general.component';
import { SidebarFilterService } from '../sidebar-filter/services/sidebar-filter.service';

@Component({
  selector: 'app-dropdown-filter-facet',
  templateUrl: './dropdown-filter-facet.component.html',
  styleUrls: ['./dropdown-filter-facet.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchBoxGeneralComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SidebarFilterService]
})
export class DropDownFilterFacetComponent implements OnInit {

  constructor(private readonly fb: FormBuilder, private readonly cdr: ChangeDetectorRef, private readonly serviceFacetFilters: SidebarFilterService) { }

  @Input('facetList') facetList: Array<string> = [];
  @Input('selectionMultiple') selectionMultip: boolean = false;
  @Output('emitSelectedFilter') emitSelectedFilter: EventEmitter<ItemFilterSelection | string> = new EventEmitter();
  isActive: boolean = false;
  filteredFacetList = new Array<string>();
  isItemActive: ItemFilterSelection = {};
  formSearch = this.fb.group({
    searchKeyWord: new FormControl({ value: '', disabled: false })
  });

  ngOnInit() {
    // Initialize the filtered list with all elements from the facetList
    this.filteredFacetList = [...this.facetList];

    this.serviceFacetFilters.getStateFacetFilters().subscribe(facetFilterState => this.isItemActive = facetFilterState)
  }

  emitFacetFilterSelected(facetFilter: string) {
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

  getValueChangeInput(_value: string): void {
    // Filter the original list based on the modified input
    this.filteredFacetList = this.facetList.filter(value => this.isMatch(value, _value));
    // Mark the component for change detection
    this.cdr.markForCheck();
  }

  itemActive(item: any) {
    // Check if the item is active
    return this.isItemActive[item]
  }

  trackByIdFn(index: number, item: any) {
    // Function for tracking items by ID, useful for performance optimization
    return item.id;
  }

}