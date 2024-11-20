package app;
import java.time.LocalDateTime;

public class Booking {
    private User user;
    private String room;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public Booking(User user, String room, LocalDateTime startTime, LocalDateTime endTime) {
        this.user = user;
        this.room = room;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}