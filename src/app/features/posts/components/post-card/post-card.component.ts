import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PostService } from '../../../../core/services/post.service';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
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

  private postService = inject(PostService);
  private dialog = inject(MatDialog);
  loggedUserId: string | null = localStorage.getItem('userId');

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
}
