package models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Event {
    private String name;
    private LocalDateTime eventDate;
    private int maxSlots;
    private List<User> attendees;

    // Constructor
    public Event(String name, LocalDateTime eventDate, int maxSlots) {
        this.name = name;
        this.eventDate = eventDate;
        this.maxSlots = maxSlots;
        this.attendees = new ArrayList<>();
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public int getMaxSlots() {
        return maxSlots;
    }

    public void setMaxSlots(int maxSlots) {
        this.maxSlots = maxSlots;
    }

    public List<User> getAttendees() {
        return attendees;
    }

    // Add attendee to the event
    public boolean addAttendee(User user) {
        if (attendees.size() < maxSlots) {
            attendees.add(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String toString() {
        return "Event{" +
                "name='" + name + '\'' +
                ", eventDate=" + eventDate +
                ", maxSlots=" + maxSlots +
                ", attendees=" + attendees +
                '}';
    }
}
