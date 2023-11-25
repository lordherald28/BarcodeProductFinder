import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [ MenuComponent]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
