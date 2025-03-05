import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PostService } from '../../../../core/services/post.service';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { CreateCommentComponent } from '../../../comments/components/create-comment/create-comment.component';
import { CommentListComponent } from '../../../comments/components/comment-list/comment-list.component';
import { CommentService } from '../../../../core/services/comment.service';

@Component({
  selector: 'app-post-card',
  imports: [
    CommonModule,
    CreateCommentComponent,
    CommentListComponent,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input() post!: {
    _id: string;
    text: string;
    createdAt: string;
    author: { _id: string; username: string };
  };

  @Output() postDeleted = new EventEmitter<string>();
  @Output() postUpdated = new EventEmitter<string>();

  @ViewChild('commentList') commentList!: CommentListComponent;

  private postService = inject(PostService);
  private commentService = inject(CommentService);
  private dialog = inject(MatDialog);
  loggedUserId: string = localStorage.getItem('userId') || '';

  openEditDialog() {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      data: { post: this.post },
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        this.postService.updatePost(this.post._id, updatedData).subscribe(() => {
          this.postUpdated.emit(updatedData.text);
        });
      }
    });
  }

  deletePost() {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(this.post._id).subscribe(() => {
        this.postDeleted.emit(this.post._id);
      });
    }
  }

  handleComment(commentText: string) {
    console.log('New Comment:', commentText);
    const newComment = {
      post: this.post._id,
      author: this.loggedUserId,
      text: commentText,
    };
    this.commentService.createComment(newComment).subscribe({
      next: () => {
        this.commentList.loadComments();
      },
      error: (error) => {
        console.error('Error creating comment:', error);
      },
    });
  }

  getComments() {
    this.commentService.getCommentsByPostId(this.post._id).subscribe({
      next: (comments) => {
        console.log('Comments:', comments);
      },
      error: (error) => {
        console.error('Error getting comments:', error);
      },
    });
  }
}
