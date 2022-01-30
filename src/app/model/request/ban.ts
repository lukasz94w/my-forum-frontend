export class Ban {

  dateOfBan: string;
  reasonOfBan: string;
  userName: string;

  constructor(dateOfBan: string, reasonOfBan: string, userName: string) {
    this.dateOfBan = dateOfBan;
    this.reasonOfBan = reasonOfBan;
    this.userName = userName;
  }
}
