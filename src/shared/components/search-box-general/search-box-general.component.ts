import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription, } from 'rxjs';
import { debounceTime, distinctUntilChanged, } from 'rxjs/operators';


@Component({
  selector: 'app-search-box-general',
  templateUrl: './search-box-general.component.html',
  styleUrls: ['./search-box-general.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, /* CoreModule */],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxGeneralComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  filters = {
    brand: false,
  };
  selectedBrand: string = '';
  searchType: string = '';
  searchQuery: string = '';
  formSearch = this.fb.group({
    searchKeyWord: new FormControl({ value: '', disabled: false })
  });
  filterValueChange$ = new Observable<string>();
  subs$ = new Array<Subscription>();
  @Output('emitValueChangeInput')
  emitValueChangeInput: EventEmitter<string> = new EventEmitter();
  @Input('setDebounceTime') setDebounceTime: number = 1000;
  @Input('placeHolder') placeHolder: string = "Search products by barcode, title, categories..."

  ngOnInit() {
    this.subs$.push(this.formSearch.controls.searchKeyWord.valueChanges.pipe(
      debounceTime(this.setDebounceTime),
      distinctUntilChanged(),
    ).subscribe((keyValue) => { this.emitValueChangeInput.emit(keyValue as string); this.cdr.markForCheck() }));

  }


  ngOnDestroy(): void {
    this.subs$.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    })
  }

}
