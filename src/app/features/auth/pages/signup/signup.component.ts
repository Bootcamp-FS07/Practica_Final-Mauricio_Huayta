import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private snackBar: MatSnackBar) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
        confirmPassword: [''],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    const valid = hasUpper && hasLower && hasNumber && hasSpecial;
    return valid ? null : { passwordInvalid: true };
  }

  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPasswordControl = group.get('confirmPassword');
    const confirmPassword = confirmPasswordControl?.value;

    if (password !== confirmPassword) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl?.setErrors(null);
      return null;
    }
  };

  registerUser() {
    if (this.signupForm.invalid) return;

    const { username, password } = this.signupForm.value;

    this.authService.register({ username, password }).subscribe({
      next: (response) => {
        console.log(response);
        this.snackBar.open('Succesful register', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.error.message}`, 'Close', { duration: 3000 });
      },
    });
  }
}
