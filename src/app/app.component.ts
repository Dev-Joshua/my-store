import { Component } from '@angular/core';

import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';

  constructor(private usersServices: UsersService) {}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  createUser() {
    this.usersServices
      .create({
        name: 'Andres',
        email: 'Jdaniel@mail.com',
        password: '12345',
        avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
        role: 'admin',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }
}
