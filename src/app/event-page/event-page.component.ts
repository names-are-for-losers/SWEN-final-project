import { Component } from '@angular/core';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {
  events = [
    { title: 'ClubFest 2023', date: '2023-12-15', location: 'City Hall', description: 'An exciting gathering to showcase clubs and activities.' },
    { title: 'Tech Meetup', date: '2023-12-20', location: 'Tech Park', description: 'Explore the latest in tech innovations and startups.' },
    { title: 'Art Expo', date: '2024-01-10', location: 'Downtown Gallery', description: 'A celebration of creativity and artistic talent.' },
  ];
}
