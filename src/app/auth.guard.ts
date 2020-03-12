import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userservice: UsersService,
    private router: Router
    ) {}

  canActivate() {
    if (this.userservice.loggedIn()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }

}
