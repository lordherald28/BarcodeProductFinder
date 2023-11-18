import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vercel',
  templateUrl: './vercel.component.html',
  styleUrls: ['./vercel.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class VercelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
