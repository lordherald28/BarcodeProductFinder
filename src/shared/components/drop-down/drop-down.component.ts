import { CommonModule } from '@angular/common';
import { AfterRenderOptions, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IBaseComponets } from 'src/core/bases/base-change-strategy';
import { SearchBoxGeneralComponent } from '../search-box-general/search-box-general.component';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DropDownService } from './service/drop-down.service';
import { SharedModule } from 'src/shared/shared.module';
import { ItemFilterSelection } from 'src/presentacion/pages/product/components/sidebar-filter/models/item-filter-selection';


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
      // console.log(this.value)
      this.listFiltersFacet = changes['value'].currentValue
    }
    if (changes['cleanSelectionFacet'] && changes['cleanSelectionFacet'].currentValue) {
      // console.log('Limpieza de selecciones activada');
      this.cleanSelectionFacetFilters();
    }
    if (changes['visible'] && changes['visible'].currentValue) {
      // console.log(this.visible)
    } 
  }

  ngOnInit() { }

  getValueChangeInput(value: string): void {
    this.searchTerm = value; // Actualizar el término de búsqueda cuando el usuario escribe
  }

  emitFacetFilterSelected(key: string, facetFilter: string) {
    if (this.selectionMultiple) {
      this.isItemActive[facetFilter] = !this.isItemActive[facetFilter];
    } else {
      for (let key in this.isItemActive) {
        this.isItemActive[key] = false;
      }
      this.isItemActive[facetFilter] = true;
    }

    this.dropDownService.toggleSelection(key, facetFilter);
    this.OnClick.emit(this.dropDownService.getSelections())
    this.changeDetectorRef.markForCheck();
  }

  isMatch(facetValue: string, inputValue: string): boolean {
    const normalizedInputValue = inputValue.toLowerCase().replace('&', 'and');
    const normalizedFacetValue = facetValue.toLowerCase().replace('&', 'and');
    const categories = normalizedInputValue.split('>').map(s => s.trim());
    return categories.some(category => normalizedFacetValue.includes(category));
  }

  trackByIdFn(index: number, item: any) {
    return item;
  }

  cleanSelectionFacetFilters() {
    if (this.cleanSelectionFacet) {
      this.isItemActive = {};
      this.dropDownService.clearSelections(); // Suponiendo que esta función existe en el servicio
      console.log(this.dropDownService.getSelections())
      this.changeDetectorRef.markForCheck();
    }
  }

  getStateFilterByName(nameFacet: string): boolean {
    return this.marketListFilterFacet.includes(nameFacet);
  }

}
