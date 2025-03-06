import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private feedService = inject(PostService);
  private fb = inject(FormBuilder);

  @Output() postCreated = new EventEmitter<void>();

  postForm = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(150)]],
  });

  createPost() {
    const username = localStorage.getItem('userId') || 'unknown';
    const postData = {
      text: this.postForm.value.text || '',
      author: username,
    };

    this.feedService.createPost(postData).subscribe(() => {
      this.postForm.reset();
      this.postCreated.emit();
    });
  }
}
