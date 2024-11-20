package app;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Event {
    private String name;
    private LocalDateTime eventDate;
    private int maxSlots;
    private List<User> attendees;

    public Event(String name, LocalDateTime eventDate, int maxSlots) {
        this.name = name;
        this.eventDate = eventDate;
        this.maxSlots = maxSlots;
        this.attendees = new ArrayList<>();
    }

    public boolean addAttendee(User user) {
        if (attendees.size() < maxSlots) {
            attendees.add(user);
            return true;
        } else {
            return false;
        }
    }
}
