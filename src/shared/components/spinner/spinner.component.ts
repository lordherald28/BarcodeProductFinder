import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class SpinnerComponent implements OnInit {

  @Input() isLoading: boolean = true;
  @Output() cancelLoadingSpinner: EventEmitter<boolean> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onCancelLoading() {
    this.isLoading = false;
    this.cancelLoadingSpinner.emit(true)
  }

}
