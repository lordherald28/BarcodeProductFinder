import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from 'src/core/models/product.model';
import { UrlImgNotFoundPipe } from 'src/shared/pipes/url-img-not-found.pipe';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProductComponent implements OnInit {

  constructor() { }

  @Input('product') product !: ProductModel;

  ngOnInit() {
  }

}
