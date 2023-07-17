import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from './../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = ' https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // request para obtener un id en particular de cualquier producto
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          //500
          return throwError('Algo esta fallando en el servidor');
        }
        if (error.status === HttpStatusCode.NotFound) {
          //404
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          //401
          return throwError('No estas autorizado');
        }

        return throwError('¡Ups algo salio mal!');
      })
    );
  }

  // request para la paginacion
  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset },
    });
  }

  // request para crear un producto, enviandole la interfaz de tipo Product
  createProduct(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  // request para actualizar un producto
  updateProduct(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  // Esta query devuelve un booleano(si elimino o no el producto)
  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}

/*
La data que venga de createProductDTO sera la que enviaremos en el cuerpo de la peticion para ser enviado a la API
El DTO es el data transfer object, que es lo que enviaamos a nuestra api.
Le enviamos a la API un dto pero cuando la api responda nos va a enviar un producto(algo que si tiene id y la category anidada)
*/
