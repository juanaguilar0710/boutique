import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      map(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}