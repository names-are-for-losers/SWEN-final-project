import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service'; // Corrected path

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup; // Define the 'loginForm' property

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Initialize the form group with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Define the 'onSubmit' method
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          alert('Login successful!');
          // Redirect to dashboard or another page
        },
        error: (err) => {
          alert('Login failed: ' + err.error.message);
        },
      });
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}
