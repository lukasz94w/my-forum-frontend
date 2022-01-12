import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {LocalStorageService} from "../service/local-storage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {User} from "../model/response/user";
import {NavTabService} from "../service/event/nav-tab.service";
import {SignOutService} from "../service/event/sign-out.service";

@Component({
  selector: 'app-user-profile-test',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})
export class UserProfileSettingsComponent implements OnInit {

  usernameFromUrl: string = ''
  usernameFromLocalStorage: string = ''
  user = {} as User;
  activeTab: string = 'account'

  showUserSettings: boolean = false;
  welcomeTextHeader: string = '';
  welcomeTextSub: string = '';

  constructor(private userService: UserService, private localStorageService: LocalStorageService,
              private activatedRoute: ActivatedRoute, private navTabService: NavTabService, private signOutService: SignOutService) {
  }

  ngOnInit(): void {
    this.navTabService.navTabChanged$.subscribe(
      selectedNavTabName => {
        this.selectActiveTab(selectedNavTabName);
      });
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.usernameFromUrl = params['username'];
        this.initializeComponent();
      });
    this.signOutService.signOutEvent$.subscribe(
      () => {
        this.showUserSettings = false;
        this.initializeComponent();
      }
    )
  }

  initializeComponent() {
    this.selectActiveTab('account')
    this.setHeaderTexts();
    this.userService.getUserInfo(this.usernameFromUrl).subscribe(
      (data: User) => {
        this.user = data;
      })
  }

  private setHeaderTexts() {
    this.usernameFromLocalStorage = this.localStorageService.getUsername();

    if (this.usernameFromUrl === this.usernameFromLocalStorage) {
      this.showUserSettings = true;
      this.welcomeTextHeader = 'Settings';
      this.welcomeTextSub = 'Customize your profile';
    } else {
      this.showUserSettings = false;
      this.welcomeTextHeader = this.usernameFromUrl + ' profile data';
      this.welcomeTextSub = 'Get info about this user';
    }
  }

  selectActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
}
