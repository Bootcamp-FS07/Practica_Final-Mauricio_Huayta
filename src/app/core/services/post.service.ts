import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/post';
  private http = inject(HttpClient);

  createPost(post: { text: string; author: string }): Observable<unknown> {
    return this.http.post(this.apiUrl, post);
  }
}
