export class Booking {
  constructor(user, room, startTime, endTime) {
    this.user = user;
    this.room = room;
    this.startTime = new Date(startTime);
    this.endTime = new Date(endTime);
  }

  getDuration() {
    const durationMs = this.endTime - this.startTime;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  }
}
