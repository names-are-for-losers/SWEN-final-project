import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../signup-page/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  signupForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Handles form submission for user signup.
   */
  onSubmit(): void {
    this.errorMessage = ''; // Clear previous errors
    if (this.signupForm.invalid) {
      return; // Do nothing if the form is invalid
    }

    this.isSubmitting = true; // Start the loading state

    const { name, email, password } = this.signupForm.value; // Extract form values

    this.authService.signup(name, email, password).subscribe({
      next: (response) => {
        alert(response.message); // Show success message
        this.isSubmitting = false; // Stop the loading state
        this.signupForm.reset(); // Reset the form
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Signup failed. Please try again.';
        this.isSubmitting = false; // Stop the loading state
      },
    });
  }
}
