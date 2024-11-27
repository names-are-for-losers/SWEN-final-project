import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Sign up user
  signupUser(userData: { first_name: string; last_name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData, { withCredentials: true });
  }

  // Login
  loginUser(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData, { withCredentials: true });
  }

  // Logout
  logoutUser(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  // Fetch events
  getEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/events`, { withCredentials: true });
  }

  // Fetch bookings
  getBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/bookings`, { withCredentials: true });
  }

  // Add booking
  addBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/bookings`, bookingData, { withCredentials: true });
  }

  // Fetch appointments
  getAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/appointments`, { withCredentials: true });
  }

  // Add appointment
  addAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/appointments`, appointmentData, { withCredentials: true });
  }
}
