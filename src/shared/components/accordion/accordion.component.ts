import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAccordionItemModel } from 'src/shared/models/accordion.model';
import { CheckBoxComponent } from '../check-box/check-box.component';

// Enumeration for expand button icons
enum eExpandButtonIcon {
  more = 'add',
  less = 'remove',
}

/**
 * Component for displaying an accordion with expandable/collapsible items.
 */
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  standalone: true,
  imports: [CommonModule, CheckBoxComponent], // Importing CommonModule and CheckBoxComponent
  changeDetection: ChangeDetectionStrategy.OnPush // OnPush change detection for performance optimization
})
export class AccordionComponent implements OnInit {
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  // Input properties for accordion item model and visibility
  @Input() accordionsItemsModel: IAccordionItemModel = { description: '', hasSelectionMultiple: false, isOpen: false, name: '' };
  @Input() visible: boolean = true;

  // Output event to emit when an accordion item is clicked
  @Output() OnClick: EventEmitter<IAccordionItemModel | any> = new EventEmitter<IAccordionItemModel | any>();

  ngOnInit() { }

  // Property to track the icon of the expand button
  expandButtonIcon: string = eExpandButtonIcon.more;

  /**
   * Toggles the accordion item between expanded and collapsed states.
   * Updates the expand button icon and the accordion item list.
   * Emits an event with the accordion item model.
   * @param expands - The current state of the accordion.
   */
  toggleAccordion(expands: string): void {
    this.expandButtonIcon = expands.toLocaleLowerCase().trim() === eExpandButtonIcon.less.toLocaleLowerCase().trim() ? eExpandButtonIcon.more : eExpandButtonIcon.less;
    this.updateListAccordionItems(this.accordionsItemsModel.name);
    this.OnClick.emit(this.accordionsItemsModel);
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Calculates the height for the accordion content.
   * @returns true if the accordion item is open, otherwise false.
   */
  calculateHeight(): boolean {
    this.changeDetectorRef.markForCheck();
    return this.accordionsItemsModel.isOpen;
  }

  /**
   * Updates the accordion item's open state based on the provided name.
   * @param nameAccorion - The name of the accordion item to update.
   * @returns The updated accordion item model.
   */
  updateListAccordionItems(nameAccorion: string) {
    if (nameAccorion === this.accordionsItemsModel.name) {
      this.accordionsItemsModel = {
        ...this.accordionsItemsModel,
        isOpen: !this.accordionsItemsModel.isOpen
      };
    }
    this.changeDetectorRef.markForCheck();
    return this.accordionsItemsModel;
  }

  /**
   * Handles click events on the check box within the accordion.
   * Toggles the hasSelectionMultiple property of the accordion item model.
   * @param event - The event object from the check box click.
   */
  onCheckClick(event: any) {
    this.accordionsItemsModel = {
      ...this.accordionsItemsModel,
      hasSelectionMultiple: !event
    };
  }
}
