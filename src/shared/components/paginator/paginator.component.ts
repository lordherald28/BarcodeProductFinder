import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PaginationComponent {
  currentPage: number = 1;
  disableNext: boolean = false
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    // Implement your logic to determine if there are more pages
    // For example, you can check against a total number of pages.
    // If there are more pages, increment currentPage.
    // Replace the condition below with your logic.
    if (this.currentPage === 10) {
      this.disableNext = !this.disableNext
    }
    if (this.currentPage < 10) {
      this.currentPage++;
    }
  }
}
