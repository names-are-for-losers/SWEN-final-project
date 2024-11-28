import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['loginUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('should alert if email or password is missing', () => {
      spyOn(window, 'alert'); // Spy on alert method
      component.loginData = { email: '', password: '' };

      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('Both email and password are required!');
      expect(apiService.loginUser).not.toHaveBeenCalled();
    });

    it('should call loginUser API with correct data', () => {
      const mockResponse = { user: { email: 'testuser@example.com', name: 'Test User' } };
      apiService.loginUser.and.returnValue(of(mockResponse));
      spyOn(window, 'alert'); // Spy on alert method

      component.loginData = { email: 'testuser@example.com', password: 'password123' };
      component.onSubmit();

      expect(apiService.loginUser).toHaveBeenCalledWith(component.loginData);
      expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockResponse.user));
      expect(window.alert).toHaveBeenCalledWith('Login successful!');
      expect(router.navigate).toHaveBeenCalledWith(['/home-page']);
    });

    it('should handle login API failure', () => {
      const mockError = new Error('Invalid credentials');
      apiService.loginUser.and.returnValue(throwError(mockError));
      spyOn(window, 'alert'); // Spy on alert method
      spyOn(console, 'error'); // Spy on console.error

      component.loginData = { email: 'testuser@example.com', password: 'wrongpassword' };
      component.onSubmit();

      expect(apiService.loginUser).toHaveBeenCalledWith(component.loginData);
      expect(console.error).toHaveBeenCalledWith('Login failed:', mockError);
      expect(window.alert).toHaveBeenCalledWith('Login failed. Please check your credentials and try again.');
    });
  });
});