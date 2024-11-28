class Appointment {
  constructor(user, staffMember, appointmentDate) {
    this.user = user;
    this.staffMember = staffMember;
    this.appointmentDate = new Date(appointmentDate);
  }
}
