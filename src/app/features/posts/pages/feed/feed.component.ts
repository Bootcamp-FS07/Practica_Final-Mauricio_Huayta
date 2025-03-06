import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CreatePostComponent } from '../../components/create-post/create-post.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { UserService } from '../../../../core/services/user.service';
import { Post, PostService } from '../../../../core/services/post.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-feed',
  imports: [
    CommonModule,
    CreatePostComponent,
    PostCardComponent,
    MatCardModule,
    MatDividerModule,
    MatPaginatorModule,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  userService = inject(UserService);
  postService = inject(PostService);

  posts: Post[] = [];
  paginatedPosts: Post[] = [];
  pageSize = 5;
  currentPage = 0;

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      this.updatePaginatedPosts();
    });
  }

  handlePostDeleted(postId: string) {
    this.posts = this.posts.filter((post) => post._id !== postId);
    this.updatePaginatedPosts();
  }

  handlePostUpdated(updatedText: string, postId: string) {
    const index = this.posts.findIndex((post) => post._id === postId);
    if (index !== -1) {
      this.posts[index].text = updatedText;
    }
    this.updatePaginatedPosts();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedPosts();
  }

  updatePaginatedPosts(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
  }
}
