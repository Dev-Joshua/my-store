import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';

  constructor(
    private authServices: AuthService,
    private usersServices: UsersService
  ) {}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  createUser() {
    this.usersServices
      .create({
        name: 'Andres',
        email: 'andes@mail.com',
        password: '222',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  login() {
    this.authServices.login('andes@mail.com', '222').subscribe((rta) => {
      console.log(rta.access_token);
    });
  }
}
