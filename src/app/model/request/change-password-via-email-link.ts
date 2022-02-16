export class ChangePasswordViaEmailLink {

  newPassword: string;
  receivedToken: string;

  constructor(newPassword: string, receivedToken: string) {
    this.newPassword = newPassword;
    this.receivedToken = receivedToken;
  }
}
