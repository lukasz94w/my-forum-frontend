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
  @Input() showUserSettings: boolean = false;

  constructor(private navTabService: NavTabService) {
  }

  changeTab(tabName: string) {
    this.navTabService.changeTab(tabName);
  }
}
