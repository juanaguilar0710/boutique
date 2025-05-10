// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as jwt from 'jwt-decode';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRATION_KEY = 'token_expiration';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl+'auth/login', { username, password }).pipe(
      tap((response: any) => {
        console.log(response);
        
        this.setSession(response.token);
      }),
      catchError(error => {
        // Puedes personalizar el mensaje de error según la respuesta del servidor
        throw new Error(error.error?.message || 'Error al iniciar sesión');
      })
    );
  }

  private setSession(token: string): void {
    const decodedToken: any = jwt.jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRATION_KEY, expirationDate.toString());
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  private checkToken(): void {
    const token = this.getToken();
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    
    if (!token || !expiration || new Date(expiration) <= new Date()) {
      this.logout();
    } else {
      this.isAuthenticatedSubject.next(true);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getTokenExpiration(): Date | null {
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    return expiration ? new Date(expiration) : null;
  }
}