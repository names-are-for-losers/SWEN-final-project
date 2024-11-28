import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.css'],
})
export class AppointmentPageComponent implements OnInit {
  appointments: any[] = []; // Store appointments
  message: string = ''; // Message to display if no appointments
  newAppointment = {
    booker_email: '',
    bookee_name: '',
    location: '',
    date: '',
    time: '',
  }; // Store new appointment details

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  // Fetch all appointments
  loadAppointments(): void {
    this.apiService.getAppointments().subscribe(
      (data) => {
        if (data.appointments.length === 0) {
          this.message = 'No appointments available.';
        } else {
          this.appointments = data.appointments;
          this.message = ''; // Clear the message if appointments exist
        }
      },
      () => {
        // Show user-friendly error message
        this.message = 'Error loading appointments. Please try again later.';
        // Optional: Log detailed error only in development mode
        console.log('No appointments');
      }
    );
  }


  addAppointment(event: Event): void {
    event.preventDefault(); // Prevent form reload

    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.newAppointment.booker_email = user.email; // Assign email from session
    } else {
      alert('User session not found. Please log in again.');
      return;
    }

    this.apiService.addAppointment(this.newAppointment).subscribe(
      (response) => {
        console.log('Appointment added:', response);
        alert('Appointment added successfully!');
        this.loadAppointments(); // Reload appointments
        this.newAppointment = {
          booker_email: '',
          bookee_name: '',
          location: '',
          date: '',
          time: '',
        }; // Reset the form
      },
      (error) => {
        console.error('Error adding appointment:', error);
        alert('Failed to add appointment. Please try again.');
      }
    );
  }
}
