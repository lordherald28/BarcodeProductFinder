import { CommonModule } from '@angular/common';
import { AfterRenderOptions, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IBaseComponets } from 'src/core/bases/base-change-strategy';
import { SearchBoxGeneralComponent } from '../search-box-general/search-box-general.component';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DropDownService } from './service/drop-down.service';
import { SharedModule } from 'src/shared/shared.module';
import { ItemFilterSelection } from './../../models/item-filter-selection';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBoxGeneralComponent, SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownComponent extends IBaseComponets implements OnInit, OnChanges {


  @Input() value: string[] = [];
  @Input() nameElement: string = "";
  @Input() nameElementList: string[] = [];
  @Output() OnClick: EventEmitter<any> = new EventEmitter();
  @Input() selectionMultiple: boolean = false;
  @Output() OnSend: EventEmitter<any> = new EventEmitter();
  @Input() cleanSelectionFacet: boolean = false;
  @Input() visible: boolean = true;
  public listFiltersFacet: string[] = [];
  public marketListFilterFacet: string[] = [];
  isUserInput = false;
  isUserClick = false;
  private readonly subs$ = new Subscription();
  searchTerm: string = ''; // Esta propiedad almacenará el término de búsqueda
  isItemActive: ItemFilterSelection = {};



  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private readonly dropDownService: DropDownService

  ) {
    super(changeDetectorRef);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['value'] && changes['value'].currentValue) {
      this.listFiltersFacet = changes['value'].currentValue
    }

    if (changes['cleanSelectionFacet'] && changes['cleanSelectionFacet'].currentValue) {
      this.cleanSelectionFacetFilters();
    }

  }

  ngOnInit() { }

  getValueChangeInput(value: string): void {
    this.searchTerm = value; // Actualizar el término de búsqueda cuando el usuario escribe
  }

  /**
   * Handles the selection logic for dropdown items and emits the current selections.
   * If multiple selection is enabled, toggles the active state of the selected facet filter.
   * Otherwise, deactivates all other selections and activates the current one.
   * Finally, it updates the dropdown service with the new selection and triggers change detection.
   */
  emitFacetFilterSelected(key: string, facetFilter: string) {
    if (this.selectionMultiple) {
      this.isItemActive[facetFilter] = !this.isItemActive[facetFilter];
    } else {
      for (let key in this.isItemActive) {
        this.isItemActive[key] = false;
      }
      this.isItemActive[facetFilter] = true;
    }

    this.dropDownService.toggleSelection(key, facetFilter, this.selectionMultiple);
    this.OnClick.emit(this.dropDownService.getSelections());
    this.changeDetectorRef.markForCheck();
  }

  /**
   * A tracking function used to optimize performance in ngFor.
   * It returns the item itself as a unique identifier.
   */
  trackByIdFn(index: number, item: any) {
    return item;
  }

  /**
   * Clears all selections in the dropdown if the 'cleanSelectionFacet' is true.
   * Resets the 'isItemActive' object and updates the dropdown service.
   * Also triggers a change detection cycle.
   */
  cleanSelectionFacetFilters() {
    if (this.cleanSelectionFacet) {
      this.isItemActive = {};
      this.dropDownService.clearSelections();
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * Checks if a given facet name is included in the 'marketListFilterFacet'.
   * Returns true if the name is found, false otherwise.
   */
  getStateFilterByName(nameFacet: string): boolean {
    return this.marketListFilterFacet.includes(nameFacet);
  }


}
