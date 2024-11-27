import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'; // Ensure the path is correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.apiService.loginUser(this.loginData).subscribe(
        (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('user', JSON.stringify(response.user)); // Store user data in localStorage
          alert('Login successful!');
          this.router.navigate(['/home-page']); // Redirect to home page
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials and try again.');
        }
      );
    } else {
      alert('Both email and password are required!');
    }
  }  
}
