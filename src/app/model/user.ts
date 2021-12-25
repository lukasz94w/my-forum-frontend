export class User {

  name: string;
  email: string;
  profilePic: [];
  registered: Date;

  constructor(name: string, email: string, profilePic: [], registered: Date) {
    this.name = name;
    this.email = email;
    this.profilePic = profilePic;
    this.registered = registered;
  }
}
