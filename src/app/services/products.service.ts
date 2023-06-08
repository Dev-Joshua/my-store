import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product, CreateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // request para obtener un id en particular de cualquier producto
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // request para crear un producto, enviandole la interfaz de tipo Product
  createProduct(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }
}

/*
La data que venga de createProductDTO sera la que enviaremos en el cuerpo de la peticion para ser enviado a la API
El DTO es el data transfer object, que es lo que enviaamos a nuestra api.
Le enviamos a la API un dto pero cuando la api responda nos va a enviar un producto(algo que si tiene id y la category anidada)
*/
