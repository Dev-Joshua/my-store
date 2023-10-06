import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Category } from 'src/app/models/category.model';

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
  modalSwitch = false;

  constructor(
    private storeServices: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  // Me subscribo a myCart$ para tener la lista de productos (myShoppingCart) actualizada en el counter.
  ngOnInit(): void {
    this.storeServices.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$.subscribe((data) => {
      this.profile = data;
    });
  }

  // En el estado que este lo hacemos cambiar a lo contrario
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .loginAndGet('admin_D@gmail.com', 'admin123')
      .subscribe((user) => {
        this.profile = user;
      });
  }

  getAllCategories() {
    this.categoriesService.getAll(4, 0).subscribe((data) => {
      this.categories = data;
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['home']);
  }

  openModal(value: boolean) {
    this.modalSwitch = value;
  }
}

/*
  Este componente nav es el que se va a subscribir y va a escuchar los cambios de (myShoppingCart).
  Uso el pipe switchMap para aceptar un valor de entrada y transformarlo. Asi reflejamos el email del user cuando de click en Login.
*/
