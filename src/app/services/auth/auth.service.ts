import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';
import { TokenService } from '../token/token.service';

import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  getProfile() {
    // const headers = new HttpHeaders()
    // headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()));
  }
}

/*
  Luego de que el usuario se registre poodemos utilizar el ttoken en profile como parametro para solicitar esta infoormacion.
  Le especifico que me retorne la respuesta sea de tipo User y en los headers envio la autorizacio de tipo Bearer
*/
