package app;

public class User {
  private int id;
  private String fname;
  private String lname;
  private String email;
  private String password;
  private int phoneNumber;

  public User(int id, String fname, String lname,String email, String password, int phoneNumber) {
      this.id = id;
      this.fname = fname;
      this.lname = lname;
      this.email = email;
      this.password = password;
      this.phoneNumber = phoneNumber;
  }

  public int getID() {
    return this.id;
  }

  public String getFName() {
    return this.fname;
  }

  public String getLName() {
    return this.lname;
  }

  public String getEmail() {
    return this.email;
  }

  public String getpassword() {
    return this.password;
  }

  public int getPhoneNumber() {
    return this.phoneNumber;
  }
}

