import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from './../models/product.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, { params }).pipe(
      retry(3),
      map((products) =>
        products.map((item) => {
          return {
            ...item,
            taxes: 0.19 * item.price,
          };
        })
      )
    );
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

  // este request devuelve un booleano(si elimino o no el producto)
  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}

/*
La data que venga de createProductDTO sera la que enviaremos en el cuerpo de la peticion para ser enviado a la API
El DTO es el data transfer object, que es lo que enviamos a nuestra api.
Le enviamos a la API un dto pero cuando la api responda nos va a enviar un producto(algo que si tiene id y la category anidada).

El map es para transformar los valores que lleguen en el observable. zTaxes viene siendo los impuestos, agregamos esa informacion asi
no venga desde el back y la renderizamos en el componente product.
*/
