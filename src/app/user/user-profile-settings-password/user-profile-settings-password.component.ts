import {Component, Input} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ChangePasswordThroughUserSettings} from "../../model/request/change-password-through-user-settings";
import {NgForm} from "@angular/forms";

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

  changePassword(ngForm: NgForm) {
    if (this.form.newPasswordFirstTry === this.form.newPasswordSecondTry) {
      this.doesPasswordsMatch = true;
      const changePassword = new ChangePasswordThroughUserSettings(this.form.currentPassword, this.form.newPasswordFirstTry);
      this.userService.changePassword(changePassword).subscribe(
        (response) => {
          alert(response.message)
        },
        (error) => {
          alert(error.error.message)
        }
      );
      ngForm.resetForm();
    } else {
      this.doesPasswordsMatch = false;
    }
  }
}
