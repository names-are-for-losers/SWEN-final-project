import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupPageComponent } from './signup-page.component';
import { ApiService } from '../services/api.service'; // Adjust path as necessary
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['signupUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignupPageComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('should not call signupUser API if form fields are incomplete', () => {
      component.user = { id: '', first_name: '', last_name: '', email: '', password: '' };

      component.onSubmit();

      expect(apiService.signupUser).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should call signupUser API with correct user data', () => {
      const mockUser = {
        id: '123',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'securepassword',
      };
      const mockResponse = { message: 'User registered successfully!' };

      component.user = mockUser;
      apiService.signupUser.and.returnValue(of(mockResponse));

      component.onSubmit();

      expect(apiService.signupUser).toHaveBeenCalledWith(mockUser);
      expect(router.navigate).toHaveBeenCalledWith(['/login.page']);
    });

    it('should handle API errors gracefully', () => {
      const mockError = new Error('Signup failed');
      const mockUser = {
        id: '123',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'securepassword',
      };

      spyOn(console, 'error'); // Spy on console.error
      component.user = mockUser;
      apiService.signupUser.and.returnValue(throwError(mockError));

      component.onSubmit();

      expect(apiService.signupUser).toHaveBeenCalledWith(mockUser);
      expect(console.error).toHaveBeenCalledWith('Signup failed', mockError);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});