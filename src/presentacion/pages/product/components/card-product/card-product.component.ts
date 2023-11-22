import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from 'src/core/models/product.model';
import { PROVIDERS_TOKENS, config_system } from 'src/presentacion/config/system.config';
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
  // component: { images: never[]; };

  constructor(
    @Inject(PROVIDERS_TOKENS.CONFIG_SYSTEM) public sysonfig: config_system
  ) { }

  @Input('product') product !: ProductModel;

  ngOnInit() {
  }

}
