export class Event {
  constructor(name, eventDate, maxSlots) {
    this.name = name;
    this.eventDate = new Date(eventDate);
    this.maxSlots = maxSlots;
    this.attendees = [];
  }

  addAttendee(user) {
    if (this.attendees.length < this.maxSlots) {
      this.attendees.push(user);
      return true;
    } else {
      return false;
    }
  }
}
