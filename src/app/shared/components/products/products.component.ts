import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/app/models/product.model';

import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() onLoadMore: EventEmitter<string> = new EventEmitter<string>();

  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  productChosen: Product | null = null;
  statusDetail: 'Loading' | 'Success' | 'Error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  // agregar producto al carrito
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
    this.statusDetail = 'Loading';
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productsService.getProduct(id).subscribe(
      (data) => {
        console.log('product', data);
        this.productChosen = data;
        this.statusDetail = 'Success';
      },
      (errorMessage) => {
        window.alert(errorMessage);
        this.statusDetail = 'Error';
      }
    );
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
    if (this.productChosen) {
      const changesProduct: UpdateProductDTO = {
        title: 'Nuevo titulo',
      };
      const id = this.productChosen?.id;
      this.productsService
        .updateProduct(id, changesProduct)
        .subscribe((data) => {
          // console.log('updated', data);
          const productIndex = this.products.findIndex(
            (item) => item.id === this.productChosen?.id
          );
          this.products[productIndex] = data;
          this.productChosen = data;
        });
    }
  }

  // Eliminar producto de la interfaz grafica(no backend)
  deleteProduct() {
    if (this.productChosen) {
      const id = this.productChosen?.id;
      this.productsService.deleteProduct(id).subscribe(() => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
    }
  }

  // Cargar mas productos
  loadMore() {
    this.onLoadMore.emit();
  }
}

// -> productChosen es una propiedad de tipo Product que contendra las imagenes del producto seleccionado en un array que toca recorrer
// -> Con el Output se emite la comunicacion con el padre asi le inddica cuando cargar la informacion
// -> Las pages se encargaran de hacer el render o rquest de cada componente
// -> El Input productId cada vez que cambie llamara a onShowDetail y mostraria el modal.
