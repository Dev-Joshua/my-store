import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/user.model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private location: Location) {}
  goToBack() {
    this.location.back();
  }
}
