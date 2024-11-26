package models;

import java.time.LocalDateTime;

public class Appointment {
    private User user;
    private String staffMember;
    private LocalDateTime appointmentDate;

    // Constructor
    public Appointment(User user, String staffMember, LocalDateTime appointmentDate) {
        this.user = user;
        this.staffMember = staffMember;
        this.appointmentDate = appointmentDate;
    }

    // Getters and Setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(String staffMember) {
        this.staffMember = staffMember;
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "user=" + user +
                ", staffMember='" + staffMember + '\'' +
                ", appointmentDate=" + appointmentDate +
                '}';
    }
}
