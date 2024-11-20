import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupPageComponent } from './signup-page.component';
import { AuthService } from '../login-page/auth.service';
import { of, throwError } from 'rxjs';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupPageComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form initially', () => {
    expect(component.signupForm.valid).toBeFalse();
  });

  it('should call AuthService.signup on form submission', () => {
    const signupSpy = spyOn(authService, 'signup').and.returnValue(of({ message: 'Signup successful!' }));
    component.signupForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onSignup();

    expect(signupSpy).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should display an error message on signup failure', () => {
    const signupSpy = spyOn(authService, 'signup').and.returnValue(
      throwError(() => ({ error: { message: 'Signup failed' } }))
    );

    component.signupForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onSignup();

    expect(signupSpy).toHaveBeenCalled();
  });
});
