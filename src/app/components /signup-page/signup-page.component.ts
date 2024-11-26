import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  signupForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const { name, email, password } = this.signupForm.value;

    this.http.post('http://localhost:5000/signup', { name, email, password }).subscribe({
      next: () => {
        alert('Signup successful!');
        this.signupForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Signup failed. Please try again.';
        this.isSubmitting = false;
      },
    });
  }
}
