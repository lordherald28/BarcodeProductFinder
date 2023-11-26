import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent implements OnInit {

  @Input() visible: boolean = false
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

}
