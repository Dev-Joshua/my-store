import { Component } from '@angular/core';

import { Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [
    {
      id: '1',
      name: 'PS5',
      price: 800,
      image: './assets/images/play-sattion-5.jpg',
    },
    {
      id: '2',
      name: 'Bicicleta GW',
      price: 300,
      image: './assets/images/play-sattion-5.jpg',
    },
    {
      id: '3',
      name: 'Xbox Series',
      price: 700,
      image: './assets/images/play-sattion-5.jpg',
    },
    {
      id: '4',
      name: 'Rompecabezas 5000 fichas',
      price: 100,
      image: './assets/images/play-sattion-5.jpg',
    },
  ];

  constructor(private storeService: StoreService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {}

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
