import { ApiService } from '../services/api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  user = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    if (this.user.id && this.user.first_name && this.user.last_name && this.user.email && this.user.password) {
      this.apiService.signupUser(this.user).subscribe(
        (response) => {
          console.log('User signed up successfully', response);
          this.router.navigate(['/login.page']); 
        },
        (error) => {
          console.error('Signup failed', error);
        }
      );
    }
  }
}