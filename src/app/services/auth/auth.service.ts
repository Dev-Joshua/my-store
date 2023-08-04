import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password });
  }

  profile(token: string) {
    // const headers = new HttpHeaders()
    // headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

/*
  Luego de que el usuario se registre poodemos utilizar el ttoken en profile como parametro para solicitar esta infoormacion.
  Le especifico que me retorne la respuesta sea de tipo User y en los headers envio la autorizacio de tipo Bearer
*/
