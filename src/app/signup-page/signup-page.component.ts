import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'; // Ensure the path is correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  user = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    console.log('onSubmit() called!'); // Log method trigger
    console.log('User data:', this.user); // Log form data
    if (this.user.first_name && this.user.last_name && this.user.email && this.user.password) {
      this.apiService.signupUser(this.user).subscribe(
        (response) => {
          console.log('Signup successful:', response);
          alert('Sign-up successful!');
          this.router.navigate(['/login-page']);
        },
        (error) => {
          console.error('Signup failed:', error); // Log backend error
          alert('Signup failed. Please try again.');
        }
      );
    } else {
      alert('All fields are required!');
    }
  }  
}
