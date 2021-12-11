import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {ChangePassword} from "../../model/change-password";

@Component({
  selector: 'app-user-profile-settings-password',
  templateUrl: './user-profile-settings-password.component.html',
  styleUrls: ['./user-profile-settings-password.component.css']
})
export class UserProfileSettingsPasswordComponent {

  form: any = {
    currentPassword: null,
    newPasswordFirstTry: null,
    newPasswordSecondTry: null
  }
  doesPasswordsMatch = true;

  constructor(private userService: UserService) {
  }

  changePassword() {
    if (this.form.newPasswordFirstTry === this.form.newPasswordSecondTry) {
      const changePassword = new ChangePassword(this.form.currentPassword, this.form.newPasswordFirstTry);
      this.userService.changePassword(changePassword).subscribe(
        (response: any) => {
          alert(response.message)
        },
        (error) => {
          alert(error.error.message)
        }
      )
      this.reloadPage();
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
