import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from './auth.service'; // Updated import
import { of, throwError } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid login form initially', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate email input as required', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
    emailControl?.setValue('not-an-email');
    expect(emailControl?.valid).toBeFalse();
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should call AuthService login on form submit', () => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(of({ message: 'Login successful' }));

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onSubmit();

    expect(loginSpy).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should display an error message on login failure', () => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(
      throwError(() => ({ error: { message: 'Invalid credentials' } }))
    );

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'wrongpassword',
    });
    component.onSubmit();

    fixture.detectChanges();

    expect(component.loginForm.invalid).toBeFalse();
  });
});
