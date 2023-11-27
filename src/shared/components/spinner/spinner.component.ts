import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Component for displaying a loading spinner.
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Using OnPush for change detection for performance optimization
  standalone: true,
  imports: [CommonModule] // Import CommonModule since this is a standalone component
})
export class SpinnerComponent implements OnInit {
  // Input property to control the visibility of the spinner
  @Input() isLoading: boolean = true;
  // Output event emitter to notify parent components when loading is cancelled
  @Output() cancelLoadingSpinner: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Method to handle the cancellation of the loading process.
   * Sets isLoading to false and emits an event to notify that loading has been cancelled.
   */
  onCancelLoading() {
    this.isLoading = false;
    this.cancelLoadingSpinner.emit(true);
  }
}
