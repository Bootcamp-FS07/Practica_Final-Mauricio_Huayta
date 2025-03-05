import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommentService, Comment } from '../../../../core/services/comment.service';

@Component({
  selector: 'app-comment-list',
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent implements OnInit {
  @Input() postId!: string;
  comments: Comment[] = [];
  private commentService = inject(CommentService);
  loggedUserId: string = localStorage.getItem('userId') || '';

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsByPostId(this.postId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter((comment) => comment._id !== commentId);
    });
  }
}
