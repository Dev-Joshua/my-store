import { Component } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: '1',
      name: 'PS5',
      price: 800,
      image: './assets/images/404.png',
    },
    {
      id: '2',
      name: 'Bicicleta GW',
      price: 300,
      image: './assets/images/404.png',
    },
    {
      id: '3',
      name: 'Xbox Series',
      price: 700,
      image: './assets/images/404.png',
    },
    {
      id: '4',
      name: 'Rompecabezas 5000 fichas',
      price: 100,
      image: './assets/images/404.png',
    },
  ];
}
