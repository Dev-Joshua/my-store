import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
}
