import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css'],
})
export class BookingPageComponent implements OnInit {
  bookings: any[] = []; // Store bookings
  newBooking = {
    booker_email: '',
    first_name: '',
    last_name: '',
    location: '',
    date: '',
    time: '',
  }; // Store new booking details

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  // Fetch all bookings
  loadBookings(): void {
    this.apiService.getBookings().subscribe(
      (data) => {
        this.bookings = data.bookings;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  // Add a new booking
  addBooking(event: Event): void {
    event.preventDefault(); // Prevent form reload
  
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.newBooking.booker_email = user.email; // Assign email from session
    } else {
      alert('User session not found. Please log in again.');
      return;
    }
  
    this.apiService.addBooking(this.newBooking).subscribe(
      (response) => {
        console.log('Booking added:', response);
        alert('Booking added successfully!');
        this.loadBookings(); // Reload bookings
        this.newBooking = {
          booker_email: '',
          first_name: '',
          last_name: '',
          location: '',
          date: '',
          time: '',
        }; // Reset the form
      },
      (error) => {
        console.error('Error adding booking:', error);
        alert('Failed to add booking. Please try again.');
      }
    );
  }  
}
