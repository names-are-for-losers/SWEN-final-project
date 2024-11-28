import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      console.log('AuthGuard: user status:', user); // Debug log
      if (user) {
        return true;
      }
    }
    console.log('AuthGuard: User not logged in or not in a browser, redirecting to login.');
    this.router.navigate(['/login-page']);
    return false;
  }
}
