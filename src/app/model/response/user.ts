export class User {

  name: string;
  email: string;
  profilePic: [];
  registered: Date;
  admin: boolean;
  banned: boolean;

  constructor(name: string, email: string, profilePic: [], registered: Date, admin: boolean, banned: boolean) {
    this.name = name;
    this.email = email;
    this.profilePic = profilePic;
    this.registered = registered;
    this.admin = admin;
    this.banned = banned;
  }
}
