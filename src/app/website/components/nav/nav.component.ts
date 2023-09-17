import { Component } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Category } from 'src/app/models/category.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];
  limit = 4;
  offset = 0;

  constructor(
    private storeServices: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) {}

  // Me subscribo a myCart$ para tener la lista de productos (myShoppingCart) actualizada en el counter.
  ngOnInit(): void {
    this.storeServices.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  // En el estado que este lo hacemos cambiar a lo contrario
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .loginAndGet('Jdaniel@mail.com', '12345')
      .subscribe((user) => {
        this.profile = user;
      });
  }

  getAllCategories() {
    this.categoriesService.getAll(4, 0).subscribe((data) => {
      this.categories = data;
    });
  }
}

/*
  Este componente nav es el que se va a subscribir y va a escuchar los cambios de (myShoppingCart).
  Uso el pipe switchMap para aceptar un valor de entrada y transformarlo. Asi reflejamos el email del user cuando de click en Login.
*/
