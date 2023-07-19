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

/*
  En este servicio (store) delegamos toda la manipulacion del shopping cart.

  La libreria 'rxjs' implementa todo el patron de observables dentro de Angular. En este caso
  utilizamos el BehaviorSubject para crear un observable, que permita crear este patron y asi
  otros componentes se puedan subscribir apenas reciba un cambio.

  Con el observable myCart$ escucho activamente los cambios de un componente subscrito a este observador.
  Cuando se ejecuta addProoduct, aparte de hacer push a un producto en el array myShoppingCart,
  utilizo .next para transmitir el estado de la lista actual (myShoppingCart).

  El metodo .reduce() de los arrays permite calcular y reducir todo a un solo valor para asi calcular el total del shopping cart.

*/
