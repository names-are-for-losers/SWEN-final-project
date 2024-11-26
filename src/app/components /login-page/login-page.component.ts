import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true; // Set loading to true to disable the form while submitting
      this.errorMessage = null; // Reset any previous error message

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          alert('Login successful! Redirecting to home page...');
          this.loading = false; // Reset loading
          this.router.navigate(['/home-page']); // Redirect to Home Page
        },
        error: (err) => {
          this.loading = false; // Reset loading
          this.errorMessage = err.error.message || 'Login failed. Please try again.';
        },
      });
    }
  }
}
