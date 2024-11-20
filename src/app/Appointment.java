package app;

import java.time.LocalDateTime;

public class Appointment {
    private User user;
    private String staffMember;
    private LocalDateTime appointmentDate;

    public Appointment(User user, String staffMember, LocalDateTime appointmentDate) {
        this.user = user;
        this.staffMember = staffMember;
        this.appointmentDate = appointmentDate;
    }
}