import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone:true,
  imports:[CommonModule, FormsModule]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
