export default class User {
  constructor(id, fname, lname, email, password, phoneNumber) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
  }

  // Getter and Setter for ID
  getID() { return this.id; }
  setID(newID) { this.id = newID; }

  // Getter and Setter for First Name
  getFName() { return this.fname; }
  setFName(newFName) { this.fname = newFName; }

  // Getter and Setter for Last Name
  getLName() { return this.lname; }
  setLName(newLName) { this.lname = newLName; }

  // Getter and Setter for Email
  getEmail() { return this.email; }
  setEmail(newEmail) { this.email = newEmail; }

  // Getter and Setter for Password
  getPassword() { return this.password; }
  setPassword(newPassword) { this.password = newPassword; }

  // Getter and Setter for Phone Number
  getPhoneNumber() { return this.phoneNumber; }
  setPhoneNumber(newPhoneNumber) { this.phoneNumber = newPhoneNumber; }
}
