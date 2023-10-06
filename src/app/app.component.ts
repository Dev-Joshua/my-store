import { Component } from '@angular/core';

import { UsersService } from './services/users/users.service';
import { AuthService } from './services/auth/auth.service';
import { TokenService } from './services/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';

  constructor(
    private usersServices: UsersService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }

  createUser() {
    this.usersServices
      .create({
        name: 'Andres',
        email: 'admin_D@gmail.com',
        password: 'admin123',
        avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
        role: 'admin',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }
}

/*Si existe un token en localStorage solo por unica vez se hara un getProfile() */
