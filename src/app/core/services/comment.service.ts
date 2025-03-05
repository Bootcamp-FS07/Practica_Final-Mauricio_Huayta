import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Comment {
  _id: string;
  text: string;
  author: {
    username: string;
    _id: string;
  };
  post: {
    _id: string;
    author: string;
  };
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comment`;
  private http = inject(HttpClient);

  createComment(comment: { text: string; author: string; post: string }): Observable<unknown> {
    return this.http.post(this.apiUrl, comment);
  }

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`);
  }

  deleteComment(commentId: string): Observable<Comment> {
    return this.http.delete<Comment>(`${this.apiUrl}/${commentId}`);
  }

  updateComment(commentId: string, text: string): Observable<Comment> {
    return this.http.patch<Comment>(`${this.apiUrl}/${commentId}`, { text });
  }
}
