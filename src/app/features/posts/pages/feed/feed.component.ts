import { Component, inject } from '@angular/core';
import { CreatePostComponent } from '../../components/create-post/create-post.component';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-feed',
  imports: [CreatePostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  userService = inject(UserService);

  loadPosts() {
    console.log('Loading posts...');
  }
}
