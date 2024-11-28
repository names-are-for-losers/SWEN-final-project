import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventPageComponent } from './event-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('EventPageComponent', () => {
  let component: EventPageComponent;
  let fixture: ComponentFixture<EventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventPageComponent],
      imports: [
        HttpClientTestingModule, // Mock HTTP requests
        RouterTestingModule, // Mock Router
        ReactiveFormsModule, // For form controls
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.someDefaultProperty).toBe('defaultValue'); // Example property
  });

  it('should render event list', () => {
    // Mock events data
    component.events = [
      { id: 1, name: 'Event 1', date: '2024-12-01' },
      { id: 2, name: 'Event 2', date: '2024-12-02' },
    ];
    fixture.detectChanges();
    const eventElements = fixture.nativeElement.querySelectorAll('.event-item');
    expect(eventElements.length).toBe(2);
    expect(eventElements[0].textContent).toContain('Event 1');
    expect(eventElements[1].textContent).toContain('Event 2');
  });
});