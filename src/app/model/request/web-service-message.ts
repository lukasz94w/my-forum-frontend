export class WebServiceMessage {

  statusOfBan: boolean;
  userName: string;

  constructor(statusOfBan: boolean, userName: string) {
    this.statusOfBan = statusOfBan;
    this.userName = userName;
  }
}
