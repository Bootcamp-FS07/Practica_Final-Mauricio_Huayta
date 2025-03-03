import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { FeedComponent } from './features/posts/pages/feed/feed.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'feed', component: FeedComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
