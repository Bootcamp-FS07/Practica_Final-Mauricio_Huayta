import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  {
    path: 'feed',
    loadComponent: () =>
      import('./features/posts/pages/feed/feed.component').then((m) => m.FeedComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'feed', pathMatch: 'full' },
];
