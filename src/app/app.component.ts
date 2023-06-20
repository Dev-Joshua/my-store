import { Component } from '@angular/core';

import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  token = '';

  constructor(private usersServices: UsersService) {}

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
}
