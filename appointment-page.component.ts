import { Component } from '@angular/core';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.css'] 
})
export class AppointmentPageComponent {

  timeSlots = [
    { time: '09:00 AM - 10:00 AM', booked: false },
    { time: '10:00 AM - 11:00 AM', booked: false },
    { time: '11:00 AM - 12:00 PM', booked: false },
    { time: '01:00 PM - 02:00 PM', booked: false },
    { time: '02:00 PM - 03:00 PM', booked: false },
    { time: '03:00 PM - 04:00 PM', booked: false },
    { time: '04:00 PM - 05:00 PM', booked: false },
  ];


  bookSlot(slot: { time: string; booked: boolean }): void {
    if (!slot.booked) {
      slot.booked = true; 
      alert(`You have successfully booked: ${slot.time}`);
    } else {
      alert(`This time slot is already booked: ${slot.time}`);
    }
  }
}
