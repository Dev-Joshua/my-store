import { Component } from '@angular/core';

import { Product } from '../../models/product.model';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts(10, 0).subscribe((data) => {
      // console.log(data);
      this.products = data;
      this.offset += this.limit;
    });
  }

  loadMore(): void {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}

/*
  Aqui va la logica para cargar mas informacion/productos.
  Al array de products[] le concatenamos la suguiente pagina que se cargara
*/
