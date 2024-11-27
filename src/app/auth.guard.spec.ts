import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Import the class AuthGuard

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a mock Router
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard, // Provide the AuthGuard class
        { provide: Router, useValue: mockRouter }, // Mock the Router
      ],
    });

    // Get the AuthGuard instance
    guard = TestBed.inject(AuthGuard);
  });

  it('should return true if the user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user'); // Mock logged-in state
    const result = guard.canActivate(); // Call the canActivate method
    expect(result).toBeTrue(); // Expect guard to allow access
  });

  it('should redirect to /login-page if the user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Mock not logged-in state
    const result = guard.canActivate(); // Call the canActivate method
    expect(result).toBeFalse(); // Expect guard to block access
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login-page']); // Ensure redirection
  });
});
