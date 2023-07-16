import { Component } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private storeServices: StoreService,
    private authService: AuthService
  ) {}

  // Me subscribo a myCart$ para tener la lista de products actualizada en el counter
  ngOnInit(): void {
    this.storeServices.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  // En el estado que este lo hacemos cambiar a lo contrario
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.login('andes@mail.com', '222').subscribe((rta) => {
      console.log(rta.access_token);
      this.token = rta.access_token;
      this.getProfile();
    });
  }

  getProfile() {
    this.authService.profile(this.token).subscribe((user) => {
      console.log(user);
      this.profile = user;
    });
  }
}
