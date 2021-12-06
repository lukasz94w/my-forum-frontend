import {Component} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ChangePassword} from "../../model/change-password";

@Component({
  selector: 'app-user-profile-test',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})
export class UserProfileSettingsComponent {

  form: any = {
    currentPassword: null,
    newPasswordFirstTry: null,
    newPasswordSecondTry: null
  }
  doesPasswordsMatch = true;

  constructor(private userService: UserService) {
  }

  changePassword() {
    if (!(this.form.newPasswordFirstTry === this.form.newPasswordSecondTry)) {
      this.doesPasswordsMatch = false;
      return;
    }
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
  }

  reloadPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  //TODO dac wogole w oddzielnych componentach to wszystko i tylko dodawac w HTMLU selector
}
