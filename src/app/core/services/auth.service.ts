import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as decoder from 'jwt-decode';

interface LoginResponse {
  access_token: string;
}

interface DecodedToken {
  username: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  register(data: { username: string; password: string }): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken) return false;

    const isExpired = Date.now() >= decodedToken.exp * 1000;
    return !isExpired;
  }

  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    return decoder.jwtDecode(token);
  }
}
