import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  standalone:true,
  imports:[CommonModule],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnChanges{

  constructor(private cdr : ChangeDetectorRef){}

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1000;
  @Input() maxVisiblePages: number = 10;


  ngOnChanges(changes: SimpleChanges): void {
    
  }
  get disableNext(): boolean {
    return this.currentPage === this.totalPages;
  }

  get disablePrevious(): boolean {
    return this.currentPage === 1;
  }

  previousPage() {
    if (!this.disablePrevious) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  nextPage() {
    if (!this.disableNext) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.emitPageChange();
    }
  }

  getPageNumbers(): number[] {
    const halfVisiblePages = Math.floor(this.maxVisiblePages / 2);
    const firstVisiblePage = Math.max(
      Math.min(this.currentPage - halfVisiblePages, this.totalPages - this.maxVisiblePages + 1),
      1
    );
    const lastVisiblePage = Math.min(firstVisiblePage + this.maxVisiblePages - 1, this.totalPages);
    const visiblePages = [];
    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
      visiblePages.push(i);
    }
    this.cdr.markForCheck();
    return visiblePages;
  }

  private emitPageChange() {
    this.pageChange.emit(this.currentPage);
    this.cdr.markForCheck();
  }
}
