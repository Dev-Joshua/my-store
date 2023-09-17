import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = `${environment.API_URL}/categories`;

  constructor(private http: HttpClient) {}

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Category[]>(this.apiUrl, { params });
  }

  deleteCategoryId(id: number) {
    return this.http.delete<boolean>(`${this.apiUrl}/categories/${id}`);
  }
}

// Este servicio hace el request hacia la API, /categories,  y este nos devuelve un array de categorias.
// Este array de categorias nos da el id y nombre de cada categoria
