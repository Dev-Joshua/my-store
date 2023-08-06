import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    if (token) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return authRequest;
    }
    return request;
  }
}

/*
  El interceptor apenas vea que hay un token interceptara esta request y agregara el token de forma automatica
*/
