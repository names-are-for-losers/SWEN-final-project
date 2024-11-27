import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    console.log('AuthGuard: user status:', user); // Debug log
    if (user) {
      return true;
    }
    console.log('AuthGuard: User not logged in, redirecting to login.');
    this.router.navigate(['/login-page']);
    return false;
  }
}
