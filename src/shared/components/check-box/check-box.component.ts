import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxComponent implements OnInit {

  @Input('titleCheckbox') titleCheckbox: string = "Multiple Selection";
  @Output('OnClick') OnClick: EventEmitter<boolean> = new EventEmitter();
  @HostListener('change', ['$event'])
  eventChecked(event: any) {
    this.OnClick.emit(event.target.checked)
  }
  isChecked: boolean = false;

  constructor(private readonly cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onClick(): void {
    this.isChecked = !this.isChecked; // Toggle the isChecked state
    this.OnClick.emit(this.isChecked);
  }
  
}
