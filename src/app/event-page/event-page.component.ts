import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
})
export class EventPageComponent implements OnInit {
  events: any[] = []; // Array to store fetched events
  message: string = ''; // Message to show for errors or empty events

  constructor(private apiService: ApiService) {}

  // Method to load events from the backend
  loadEvents(): void {
    this.apiService.getEvents().subscribe(
      (data) => {
        if (data.events.length === 0) {
          this.message = 'No events available.';
        } else {
          this.events = data.events;
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
        if (error.status === 404) {
          this.message = 'No events available.';
        } else if (error.status === 500) {
          this.message = 'Server error. Please try again later.';
        } else {
          this.message = 'Unexpected error occurred.';
        }
      }
    );
  }

  // Lifecycle hook to initialize data
  ngOnInit(): void {
    this.loadEvents();
  }
}
