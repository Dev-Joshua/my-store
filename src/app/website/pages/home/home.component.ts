import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Product } from 'src/app/models/product.model';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products: Product[] = [];
  productsRandom: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts(10, 0).subscribe((data) => {
      // console.log(data);
      this.products = data;
      this.offset += this.limit;
    });
    this.route.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
      console.log(this.productId);
    });
    this.productListRandom();
  }

  loadMore(): void {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }

  productListRandom() {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .pipe(
        tap((products) => {
          for (let i = 0; i < 5; i++) {
            const random = Math.floor(
              Math.random() * (this.limit + this.offset - 1) + 1
            );
            this.productsRandom.push(products[random]);
          }
        })
      )
      .subscribe((productsRandom) => {
        this.productsRandom = productsRandom;
      });
  }
}

/*
  Aqui va la logica para cargar mas informacion/productos.
  Al array de products[] le concatenamos la suguiente pagina que se cargara
*/
