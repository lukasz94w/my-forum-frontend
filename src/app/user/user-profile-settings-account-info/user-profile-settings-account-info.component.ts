import {Component, Input} from '@angular/core';
import {User} from "../../model/user";
import {NavTabService} from "../../service/nav-tab.service";

@Component({
  selector: 'app-user-profile-settings-account-info',
  templateUrl: './user-profile-settings-account-info.component.html',
  styleUrls: ['./user-profile-settings-account-info.component.css']
})
export class UserProfileSettingsAccountInfoComponent {

  @Input() user = {} as User;

  constructor(private navTabService: NavTabService) {
  }

  selectPasswordTab() {
    this.navTabService.changeTab('password')
  }

  selectAvatarTab() {
    this.navTabService.changeTab('avatar')
  }
}
