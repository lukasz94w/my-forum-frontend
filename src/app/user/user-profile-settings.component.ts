import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {LocalStorageService} from "../service/local-storage.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NavTabEvent} from "../event/nav-tab-event.service";
import {SignOutEvent} from "../event/sign-out-event.service";
import {User2} from "../model/response/user2";
import {BanUserEvent} from "../event/ban-user-event.service";
import {BanService} from "../service/ban.service";
import {WebSocketService} from "../service/web-socket.service";
import {WebServiceMessage} from "../model/request/web-service-message";
import {TextProviderService} from "../service/text-provider.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-profile-test',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})
export class UserProfileSettingsComponent implements OnInit, OnDestroy {

  usernameFromUrl: string = ''
  user = {} as User2;
  activeTabName: string = 'account'

  showUserSettings: boolean = false;
  showAdminTab: boolean = false;
  showBanUserButton: boolean = false;
  showUnBanUserButton: boolean = false;
  showBanUserWindow: boolean = false;
  userNameOfCandidateToBan: string = '';
  sourceOfOpeningWindow: string = '';

  welcomeTextHeader: string = '';
  welcomeTextSub: string = '';

  componentDestroyedNotifier = new Subject();

  constructor(private userService: UserService, private localStorageService: LocalStorageService,
              private activatedRoute: ActivatedRoute, private navTabService: NavTabEvent,
              private signOutEvent: SignOutEvent, private banUserService: BanUserEvent,
              private banService: BanService, private webSocketService: WebSocketService,
              private textProviderService: TextProviderService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.usernameFromUrl = params['username'];
        this.initializeComponent();
      });

    this.navTabService.navTabChanged$
      .pipe(takeUntil(this.componentDestroyedNotifier))
      .subscribe(
      (selectedNavTabName) => {
        this.selectActiveTab(selectedNavTabName);
      });

    this.signOutEvent.signOutEvent$
      .pipe(takeUntil(this.componentDestroyedNotifier))
      .subscribe(
      () => {
        this.showUserSettings = false;
        this.showAdminTab = false;
        this.initializeComponent();
      });

    this.banUserService.userWasBannedSource$
      .pipe(takeUntil(this.componentDestroyedNotifier))
      .subscribe(
      (sourceOfOpeningWindow) => {
        if (sourceOfOpeningWindow == 'upperButton') {
          this.showUnBanUserButton = true;
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
      },
      (error) => {
        this.router.navigate(['forum-item-not-found'], {
          state: {
            errorCode: error.status,
            errorMessage: error.error.message
          }
        });
      })
  }

  private setWelcomeTextsAndCheckIfAdminMode() {
    const isViewedUserItself = this.usernameFromUrl == this.localStorageService.getUsername();
    const isViewingUserAdmin = this.localStorageService.isUserAdmin();
    const isViewedUserAdmin = this.user.admin;
    const isViewedUserBanned = this.user.banned;

    if (isViewedUserItself) {
      this.showUserSettings = true;
      if (isViewingUserAdmin) {
        this.setWelcomeTextFor("adminItSelf")
        this.showAdminTab = true;
      } else {
        this.setWelcomeTextFor("userItSelf")
        this.showAdminTab = false;
        if (isViewedUserBanned && this.localStorageService.isUserWithoutBanLoggedIn()) {
          this.signOutEvent.emitSignOut();
          alert(this.textProviderService.getBanMessage())
        }
      }
    } else {
      this.setWelcomeTextFor("userViewer")
      this.showAdminTab = false;
      this.showUserSettings = false;
    }

    if (isViewingUserAdmin && !isViewedUserAdmin) {
      this.showBanUserButton = !isViewedUserBanned;
      this.showUnBanUserButton = !this.showBanUserButton;
      this.showBanUserButton ? this.userNameOfCandidateToBan = this.usernameFromUrl : null;
    } else {
      this.showBanUserButton = false;
      this.showUnBanUserButton = false;
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
    this.activeTabName = tabName;
  }

  unBanCurrentViewedUser() {
    this.banService.unBanUser(this.usernameFromUrl).subscribe(
      () => {
        this.showUnBanUserButton = false;
        this.showBanUserButton = true;
        this.initializeComponent();
        this.webSocketService.send(new WebServiceMessage(false, this.usernameFromUrl));
      },
      () => {
        alert("Cannot ban this user. Try again later");
      }
    )
  }

  ngOnDestroy(): void {
    this.componentDestroyedNotifier.next();
    this.componentDestroyedNotifier.complete();
  }
}
