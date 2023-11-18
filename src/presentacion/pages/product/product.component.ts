import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VercelComponent } from 'src/shared/components/vercel/vercel.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone:true,
  imports:[CommonModule, VercelComponent]
})
export default class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
