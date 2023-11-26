import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IAccordionItemModel } from 'src/shared/models/accordion.model';

enum eExpandButtonIcon {
  // more = 'expand_more',
  more = 'add',
  less = 'remove',
  // less = 'expand_less',
}


@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent implements OnInit, OnChanges {
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  @Input()
  accordionsItemsModel: IAccordionItemModel = { description: '', hasSelectionMultiple: false, isOpen: false, name: '' };
  @Input() visible: boolean = true;
  @Output() OnClick: EventEmitter<IAccordionItemModel | any> = new EventEmitter<IAccordionItemModel | any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && changes['visible'].currentValue) {
      this.changeDetectorRef.markForCheck();
    }
  }
  ngOnInit() {
  }
  expandButtonIcon: string = eExpandButtonIcon.more;

  toggleAccordion(expands: string): void {
    if (expands.toLocaleLowerCase().trim() === eExpandButtonIcon.less.toLocaleLowerCase().trim()) {
      this.expandButtonIcon = eExpandButtonIcon.more;
    } else {
      this.expandButtonIcon = eExpandButtonIcon.less;
    }
    this.updateListAccordionItems(this.accordionsItemsModel.name);
    // Elemento al cual se le da click
    this.OnClick.emit(this.accordionsItemsModel)
    this.changeDetectorRef.markForCheck();
  }

  calculateHeight(): boolean {
    this.changeDetectorRef.markForCheck();
    return this.accordionsItemsModel.isOpen ? true : false;
  }

  updateListAccordionItems(nameAccorion: string) {
    if (nameAccorion === this.accordionsItemsModel.name) {
      this.accordionsItemsModel = {
        ...this.accordionsItemsModel,
        isOpen: !this.accordionsItemsModel.isOpen
      }

    }
    this.changeDetectorRef.markForCheck();
    return this.accordionsItemsModel
  }


}
