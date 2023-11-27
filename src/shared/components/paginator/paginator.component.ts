import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

/**
 * A pagination component that allows users to navigate through pages.
 */
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnChanges, OnInit {
  // Constructor with ChangeDetectorRef for managing change detection
  constructor(private cdr: ChangeDetectorRef) { }

  // Event emitter for page change events
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  // Current page number
  @Input() currentPage: number = 1;
  // Total number of pages available
  @Input() totalPages: number = 1000;
  // Maximum number of visible pages in the paginator
  @Input() maxVisiblePages: number = 10;
  // Total number of rows in the dataset
  @Input() totalRow: number = 0;
  // Text result from a search operation
  @Input() resultTextSearch: string = '';
  // Flag to reset pagination
  @Input() resetPagination: boolean = false;
  // Tracks the last row number detected for optimization purposes
  lastRowNumberDetected: number = 0;
  // Constant for maximum pages allowed in the paginator
  readonly MAX_PAGES_ALLOWED: number = 1000;

  ngOnChanges(changes: SimpleChanges): void {
    // Resets the current page to 1 if resetPagination is true
    if (this.resetPagination) {
      this.currentPage = 1;
      this.cdr.markForCheck();
    }
  }

  ngOnInit(): void {
    // Initialize lastRowNumberDetected with the current page number
    this.lastRowNumberDetected = this.currentPage;
  }

  // Computed property to determine if the next page button should be disabled
  get disableNext(): boolean {
    return this.currentPage === this.totalPages || this.totalPages === 0;
  }

  // Computed property to determine if the last page button should be disabled
  get disableLastPage(): boolean {
    return this.currentPage === this.totalPages || this.totalPages === 0;
  }

  // Computed property to determine if the previous page button should be disabled
  get disablePrevious(): boolean {
    return this.currentPage === 1;
  }

  // Navigates to the previous page
  previousPage() {
    if (!this.disablePrevious) {
      this.currentPage--;
      this.lastRowNumberDetected -= 9;
      this.emitPageChange();
    }
  }

  // Navigates to the next page
  nextPage() {
    if (!this.disableNext) {
      this.currentPage++;
      this.lastRowNumberDetected += 9;
      this.emitPageChange();
    }
  }

  // Navigates to the last page within the allowed page limit
  lastPage() {
    if (this.currentPage < this.MAX_PAGES_ALLOWED && !this.disableNext) {
      this.currentPage = Math.min(this.totalPages, this.MAX_PAGES_ALLOWED);
      this.emitPageChange();
    }
  }

  // Navigates to the first page
  firstPage() {
    if (!this.disablePrevious) {
      this.currentPage = 1;
      this.emitPageChange();
    }
  }

  // Navigates to a specific page number
  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.emitPageChange();
    }
  }

  // Computes the visible page numbers for the paginator
  getPageNumbers(): number[] {
    const halfVisiblePages = Math.floor(this.maxVisiblePages / 2);
    const firstVisiblePage = Math.max(
      Math.min(this.currentPage - halfVisiblePages, this.totalPages - this.maxVisiblePages + 1), 1);
    const lastVisiblePage = Math.min(firstVisiblePage + this.maxVisiblePages - 1, this.totalPages);
    const visiblePages = [];
    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
      visiblePages.push(i);
    }
    this.cdr.markForCheck();
    return visiblePages;
  }

  // Emits the current page number and triggers change detection
  private emitPageChange() {
    this.pageChange.emit(this.currentPage);
    this.cdr.markForCheck();
  }
}
