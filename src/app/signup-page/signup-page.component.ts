import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  signupForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.loading = true;
      const { email, password } = this.signupForm.value;

      this.authService.signup(email, password).subscribe({
        next: () => {
          alert('Signup successful! Redirecting to login page...');
          this.loading = false;
          this.router.navigate(['/login-page']);
        },
        error: (err: any) => {
          this.loading = false;
          this.errorMessage = 'Signup failed: ' + (err.error?.message || 'An unknown error occurred.');
        },
      });
    }
  }
}
