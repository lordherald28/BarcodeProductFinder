import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class SpinnerComponent implements OnInit, OnChanges {

  @Input() isLoading: boolean = true;
  @Input() cancelLoadingSpinner: boolean = false;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
   
  }
  ngOnInit() {
  }

}
