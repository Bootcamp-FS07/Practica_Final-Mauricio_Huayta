/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import * as decoder from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  register(data: { username: string; password: string }): Observable<any> {
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
    return !!this.getToken();
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    return decoder.jwtDecode(token);
  }
}
