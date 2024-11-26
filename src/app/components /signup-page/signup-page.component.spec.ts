import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupPageComponent } from './signup-page.component';
import { AuthService } from '../../shared/auth.service'; // Ensure correct path to AuthService
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

  it('should create the SignupPageComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.signupForm.valid).toBeFalse();
  });

  it('should mark the form as valid when all fields are filled correctly', () => {
    component.signupForm.setValue({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(component.signupForm.valid).toBeTrue();
  });

  it('should call AuthService.signup on valid form submission', () => {
    const signupSpy = spyOn(authService, 'signup').and.returnValue(of({ message: 'Signup successful!' }));
    component.signupForm.setValue({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(signupSpy).toHaveBeenCalledWith('John Doe', 'test@example.com', 'password123');
  });

  it('should set isSubmitting to true when the form is submitted', () => {
    spyOn(authService, 'signup').and.returnValue(of({ message: 'Signup successful!' }));
    component.signupForm.setValue({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(component.isSubmitting).toBeTrue();
  });

  it('should display an error message when signup fails', () => {
    const errorResponse = { error: { message: 'Signup failed' } };
    spyOn(authService, 'signup').and.returnValue(throwError(() => errorResponse));

    component.signupForm.setValue({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(component.errorMessage).toBe('Signup failed. Please try again.');
    expect(component.isSubmitting).toBeFalse();
  });

  it('should reset the form after successful signup', () => {
    spyOn(authService, 'signup').and.returnValue(of({ message: 'Signup successful!' }));
    component.signupForm.setValue({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(component.signupForm.value).toEqual({
      name: '',
      email: '',
      password: '',
    });
  });

  it('should not call AuthService.signup if the form is invalid', () => {
    const signupSpy = spyOn(authService, 'signup');
    component.signupForm.setValue({
      name: '',
      email: 'invalid-email',
      password: '123',
    });

    component.onSubmit();

    expect(signupSpy).not.toHaveBeenCalled();
  });
});
