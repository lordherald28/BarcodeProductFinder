import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription, } from 'rxjs';
import { debounceTime, distinctUntilChanged, } from 'rxjs/operators';

/**
 * Component for a general search box that emits search query changes.
 */
@Component({
  selector: 'app-search-box-general',
  templateUrl: './search-box-general.component.html',
  styleUrls: ['./search-box-general.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxGeneralComponent implements OnInit, OnDestroy {
  // FormBuilder for handling form controls
  constructor(
    private fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  // Initial filters configuration
  filters = {
    brand: false,
  };

  // Properties to hold search related data
  selectedBrand: string = '';
  searchType: string = '';
  searchQuery: string = '';

  // Form group for the search box
  formSearch = this.fb.group({
    searchKeyWord: new FormControl({ value: '', disabled: false })
  });

  // Observable to handle value changes in the search box
  filterValueChange$ = new Observable<string>();

  // Subscriptions array to manage RxJS subscriptions
  subs$ = new Array<Subscription>();

  // Event emitter to output the search keyword
  @Output('emitValueChangeInput')
  emitValueChangeInput: EventEmitter<string> = new EventEmitter();

  // Input properties for debounce time and placeholder text
  @Input('setDebounceTime') setDebounceTime: number = 1000;
  @Input('placeHolder') placeHolder: string = "Search products by barcode, title, categories..."

  // Lifecycle hook for initialization
  ngOnInit() {
    // Subscribe to the form control value changes with debounce and distinct until changed
    this.subs$.push(this.formSearch.controls.searchKeyWord.valueChanges.pipe(
      debounceTime(this.setDebounceTime),
      distinctUntilChanged(),
    ).subscribe((keyValue) => { 
      this.emitValueChangeInput.emit(keyValue as string); 
      this.cdr.markForCheck(); 
    }));
  }

  // Lifecycle hook for component destruction
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subs$.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
