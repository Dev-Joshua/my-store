import { Component } from '@angular/core';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      // console.log(data);
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  // cada vez que le hagamos click al toggleProductDetail cambiamos el estado(true, false)
  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  // obtenemos el id y leemos el detalle del producto
  onShowDetail(id: string) {
    this.productsService.getProduct(id).subscribe((data) => {
      console.log('product', data);
      this.toggleProductDetail();
      this.productChosen = data;
    });
  }

  // creo un producto mediante el servicio post
  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Play Station 4',
      description: 'Consola Ps4 500Gb',
      images: ['https://placeimg.com/640/480/any'],
      price: 700,
      categoryId: 2,
    };
    this.productsService.createProduct(product).subscribe((data) => {
      console.log('created: ', data);
      this.products.unshift(data);
    });
  }

  // Editar producto
  updateProduct() {
    const changesProduct: UpdateProductDTO = {
      title: 'Nuevo titulo',
    };
    const id = this.productChosen.id;
    this.productsService.updateProduct(id, changesProduct).subscribe((data) => {
      // console.log('updated', data);
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  // Eliminar producto de la interfaz grafica(no backend)
  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.deleteProduct(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }
}
