import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  constructor(private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        const userData = this.authService.getDecodedToken();
        if (userData?.username) this.setUserId(userData.username);
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.error.message}`, 'Close', { duration: 3000 });
        console.error(err);
      },
    });
  }

  // Find the user by username and set the user id in the local storage
  private setUserId(username: string) {
    this.userService.getAllUsers().subscribe((users) => {
      const user = users.find((user: { username: string }) => user.username === username);
      if (user) {
        localStorage.setItem('userId', user._id);
      }
    });
  }
}
