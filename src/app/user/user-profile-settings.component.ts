import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {LocalStorageService} from "../service/local-storage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NavTabService} from "../service/event/nav-tab.service";
import {SignOutService} from "../service/event/sign-out.service";
import {User2} from "../model/response/user2";
import {BanUserService} from "../service/event/ban-user.service";

@Component({
  selector: 'app-user-profile-test',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})
export class UserProfileSettingsComponent implements OnInit {

  usernameFromUrl: string = ''
  user = {} as User2;
  activeTab: string = 'account'

  showUserSettings: boolean = false;
  showAdminTab: boolean = false;
  showBanUserButton: boolean = false;
  showBanUserWindow: boolean = false;
  userNameOfCandidateToBan: string = '';
  sourceOfOpeningWindow: string = '';

  welcomeTextHeader: string = '';
  welcomeTextSub: string = '';

  constructor(private userService: UserService, private localStorageService: LocalStorageService,
              private activatedRoute: ActivatedRoute, private navTabService: NavTabService,
              private signOutService: SignOutService, private banUserService: BanUserService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.usernameFromUrl = params['username'];
        this.initializeComponent();
      });
    this.navTabService.navTabChanged$.subscribe(
      (selectedNavTabName) => {
        this.selectActiveTab(selectedNavTabName);
      });
    this.signOutService.signOutEvent$.subscribe(
      () => {
        this.showUserSettings = false;
        this.showAdminTab = false;
        this.initializeComponent();
      });
    this.banUserService.userWasBannedSource$.subscribe(
      (sourceOfOpeningWindow) => {
        if (sourceOfOpeningWindow == 'upperButton') {
          this.initializeComponent();
        }
      });
  }

  initializeComponent() {
    this.selectActiveTab('account')
    this.userService.getUserInfo(this.usernameFromUrl).subscribe(
      (data: User2) => {
        this.user = data;
        this.setWelcomeTextsAndCheckIfAdminMode();
      })
  }

  private setWelcomeTextsAndCheckIfAdminMode() {
    const isViewedUserItself = this.usernameFromUrl == this.localStorageService.getUsername();
    const isViewingUserAdmin = this.localStorageService.isUserAdmin();
    const isViewedUserAdmin = this.user.admin;
    const isViewedUserAlreadyBanned = this.user.banned;

    if (isViewedUserItself) {
      this.showUserSettings = true;
      if (isViewingUserAdmin) {
        this.setWelcomeTextFor("adminItSelf")
        this.showAdminTab = true;
      } else {
        this.setWelcomeTextFor("userItSelf")
        this.showAdminTab = false;
      }
    } else {
      this.setWelcomeTextFor("userViewer")
      this.showAdminTab = false;
      this.showUserSettings = false;
    }
    this.showBanUserButton = isViewingUserAdmin && !isViewedUserAdmin && !isViewedUserAlreadyBanned;
    if (this.showBanUserButton) {
      this.userNameOfCandidateToBan = this.usernameFromUrl;
    }
  }

  private setWelcomeTextFor(typeOfUser: string) {
    switch (typeOfUser) {
      case "adminItSelf": {
        this.welcomeTextHeader = 'Admin mode active';
        this.welcomeTextSub = 'Welcome in admin mode';
        break;
      }
      case "userItSelf": {
        this.welcomeTextHeader = 'Settings';
        this.welcomeTextSub = 'Customize your profile';
        break;
      }
      case "userViewer": {
        this.welcomeTextHeader = this.usernameFromUrl + ' profile data';
        this.welcomeTextSub = 'Get info about this user';
        break;
      }
    }
  }

  selectActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
}
