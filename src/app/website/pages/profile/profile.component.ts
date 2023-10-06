import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: User | null = null;

  constructor(private authService: AuthService, private location: Location) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.user = data;
    });
  }

  goToBack() {
    this.location.back();
  }
}

/*Solicito el usuario que esta logeado */
