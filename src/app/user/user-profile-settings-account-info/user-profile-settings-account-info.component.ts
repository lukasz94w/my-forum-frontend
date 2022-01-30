import {Component, Input, OnInit} from '@angular/core';
import {NavTabService} from "../../service/event/nav-tab.service";
import {User2} from "../../model/response/user2";

@Component({
  selector: 'app-user-profile-settings-account-info',
  templateUrl: './user-profile-settings-account-info.component.html',
  styleUrls: ['./user-profile-settings-account-info.component.css']
})
export class UserProfileSettingsAccountInfoComponent implements OnInit {

  @Input() user = {} as User2;
  @Input() showUserSettings: boolean = false;
  showBanInfo: boolean = false;

  constructor(private navTabService: NavTabService) {
  }

  ngOnInit(): void {
    this.showBanInfo = this.user.banned;
  }

  changeTab(tabName: string) {
    this.navTabService.emitChangeTab(tabName);
  }
}
