import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  @Input() products: Product[] = [];
  @Output() showProductDetail = new EventEmitter<string>();

  onShowProductDetail(id: string) {
    this.showProductDetail.emit(id);
  }
}
