import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';
  private http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
