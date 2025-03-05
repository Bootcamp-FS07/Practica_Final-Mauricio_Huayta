import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService, Comment } from '../../../../core/services/comment.service';

@Component({
  selector: 'app-comment-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent implements OnInit {
  @Input() postId!: string;
  comments: Comment[] = [];
  private commentService = inject(CommentService);
  loggedUserId: string = localStorage.getItem('userId') || '';
  editingCommentId: string | null = null;
  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsByPostId(this.postId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  startEditing(comment: Comment) {
    this.editingCommentId = comment._id;
    this.editForm.setValue({ text: comment.text });
  }

  cancelEditing() {
    this.editingCommentId = null;
  }

  updateComment(commentId: string) {
    const updatedText = this.editForm.value.text;
    this.commentService.updateComment(commentId, updatedText).subscribe({
      next: () => {
        const comment = this.comments.find((c) => c._id === commentId);
        if (comment) comment.text = updatedText;
        this.editingCommentId = null;
      },
      error: (err) => console.error('Error updating comment:', err),
    });
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter((comment) => comment._id !== commentId);
    });
  }
}
