import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Comment {
  text: string;
  post_id: string;
  author_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comment`;
  private http = inject(HttpClient);

  createComment(comment: { text: string; author: string; post: string }): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`);
  }
}
