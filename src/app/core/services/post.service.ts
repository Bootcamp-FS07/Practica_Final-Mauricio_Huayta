import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Post {
  text: string;
  _id: string;
  createdAt: string;
  author: {
    username: string;
    _id: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/post`;
  private http = inject(HttpClient);

  createPost(post: { text: string; author: string }): Observable<unknown> {
    return this.http.post(this.apiUrl, post);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`);
  }

  deletePost(postId: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${postId}`);
  }

  updatePost(postId: string, updatedPost: Post) {
    return this.http.patch<Post>(`${this.apiUrl}/${postId}`, updatedPost);
  }
}
