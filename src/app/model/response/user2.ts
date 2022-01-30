import {User} from "./user";

export class User2 extends User {

  dateOfBan: Date;
  reasonOfBan: string;

  constructor(name: string, email: string, profilePic: [], registered: Date, admin: boolean, banned: boolean, dateOfBan: Date, reasonOfBan: string) {
    super(name, email, profilePic, registered, admin, banned);
    this.dateOfBan = dateOfBan;
    this.reasonOfBan = reasonOfBan;
  }
}
