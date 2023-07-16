import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() {}

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}

// Este servicio se puede inyectar en otros componentes
// El metodo .reduce() de los arrays permite calcular y reducir todo a un solo valor.
// Con el observable myCart$ para escuchar activamente cambios de un componente subscrito a este observador.
// Cuando se ejecuta addProoduct, aparte de hacer push a un producto del array myShoppingCart, utilizoo .next para transmitir el estado o valor de la lista actual (myShoppingCart)
