import {Component, Input} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ChangePasswordThroughUserSettings} from "../../model/request/change-password-through-user-settings";

@Component({
  selector: 'app-user-profile-settings-password',
  templateUrl: './user-profile-settings-password.component.html',
  styleUrls: ['./user-profile-settings-password.component.css']
})
export class UserProfileSettingsPasswordComponent {

  @Input() isUserBanned: boolean = false;

  form: any = {
    currentPassword: null,
    newPasswordFirstTry: null,
    newPasswordSecondTry: null
  }
  doesPasswordsMatch: boolean = true;

  constructor(private userService: UserService) {
  }

  changePassword() {
    if (this.form.newPasswordFirstTry === this.form.newPasswordSecondTry) {
      const changePassword = new ChangePasswordThroughUserSettings(this.form.currentPassword, this.form.newPasswordFirstTry);
      this.userService.changePassword(changePassword).subscribe(
        (response: any) => {
          alert(response.message)
        },
        (error) => {
          // TODO check after status and from that point it will be know if it's bad current password or timeout
          // do this on exception handling work, for now it's that construction
          const errorMessage = error.error.message;
          if (errorMessage == 'Current password is not correct') {
            alert(errorMessage)
          }
        }
      )
      // TODO przywrocic to, usunalem bo mi przeladowuje strone i wtedy cos z pierwszym odczytem isLoggedIn jest nie tak!
      // this.reloadPage();
    } else {
      this.doesPasswordsMatch = false;
    }
  }

  reloadPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
