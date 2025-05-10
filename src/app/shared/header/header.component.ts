import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import * as jwt from 'jwt-decode';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Mi Aplicación';
  currentUser: string = '';
  isAuthenticated$:any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
     this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuth:any) => {
      if (isAuth) {
        const token = this.authService.getToken();
        if (token) {
          try {
            const decodedToken: any = jwt.jwtDecode(token);
            this.currentUser = decodedToken?.name || decodedToken?.username || 'Usuario';
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}