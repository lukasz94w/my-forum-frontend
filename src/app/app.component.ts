import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from "./service/local-storage.service";
import {SignInEvent} from "./event/sign-in-event.service";
import {SignOutEvent} from "./event/sign-out-event.service";
import {TopicService} from "./service/topic.service";
import {PostService} from "./service/post.service";
import {Router} from "@angular/router";
import {WebSocketService} from "./service/web-socket.service";
import {BanService} from "./service/ban.service";
import {TextProviderService} from "./service/text-provider.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {SessionStorageService} from "./service/session-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  userName: string = '';
  autoLogoutIntervalReference: any;
  searchCriteria: string = 'topic titles';

  componentDestroyedNotifier = new Subject();

  constructor(private localStorageService: LocalStorageService, private signInService: SignInEvent,
              private signOutService: SignOutEvent, private topicService: TopicService,
              private postService: PostService, private router: Router, private banService: BanService,
              private webSocketService: WebSocketService, private textProviderService: TextProviderService,
              private sessionStorageService: SessionStorageService) {

    this.localStorageService.increaseNumberOfOpenedTabs();
    // check if there is only one tab opened and it has been refreshed,
    // more information in beforeUnloadTabHandler() description
    if (this.localStorageService.getNumberOfOpenedTabs() === 1 &&
      this.sessionStorageService.checkIfLastTabHasBeenRefreshed() &&
      !this.localStorageService.isRememberMeChecked()) {
      this.localStorageService.restoreLocalStorageFromSessionStorage();
      this.sessionStorageService.clearSessionStorage();
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = this.localStorageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.setLoggedInData();
      this.checkIfBanStatusHasChangedWhenAppWasClosed();
    }

    this.signInService.signInEvent$
      .pipe(takeUntil(this.componentDestroyedNotifier))
      .subscribe(
        () => {
          this.isLoggedIn = true;
          this.setLoggedInData();
        }
      )

    this.signOutService.signOutEvent$
      .pipe(takeUntil(this.componentDestroyedNotifier))
      .subscribe(
        () => {
          this.isLoggedIn = false
          this.webSocketService.disconnect();
          this.localStorageService.signOut();
          clearInterval(this.autoLogoutIntervalReference);
          this.userName = '';
        }
      );

    this.setOnWakeUpDetector();
  }

  private setAutoLogout(): void {
    // after successfully login check each 5 seconds if refresh token
    // is expired, or ban time is up if so, logout
    this.autoLogoutIntervalReference = setInterval(() => {
      if (!this.localStorageService.isLoggedIn()) {
        this.localStorageService.signOut();
        this.signOutService.emitSignOut();
        // alert("Session has ended. Please login again")
      }
    }, 5000);
  }

  signOut() {
    clearInterval(this.autoLogoutIntervalReference);
    this.isLoggedIn = false;
    this.localStorageService.signOut();
    this.signOutService.emitSignOut();
    this.userName = '';
  }

  searchCriteriaChanged(searchCriteria: string) {
    this.searchCriteria = searchCriteria;
  }

  search(searchQuery: string) {
    if (this.searchCriteria === 'topic titles') {
      this.router.navigate(['topic-list/search'], {queryParams: {query: searchQuery}});
    } else {
      this.router.navigate(['post-list', searchQuery]);
    }
  }

  checkIfBanStatusHasChangedWhenAppWasClosed() {
    this.banService.checkBanStatus(this.userName).subscribe(
      (banStatus) => {
        const _banStatus = banStatus;
        if (_banStatus && this.localStorageService.isUserWithoutBanLoggedIn()) {
          alert(this.textProviderService.getBanMessage())
          this.signOut();
        } else if (!_banStatus && this.localStorageService.isUserWithBanLoggedIn()) {
          alert(this.textProviderService.getUnBanMessage())
          this.signOut();
        }
      }
    )
  }

  setLoggedInData() {
    this.setAutoLogout();
    this.userName = this.localStorageService.getUsername();
    this.webSocketService.connect();
  }

  private setOnWakeUpDetector() {
    const timeout = 5000;
    let lastTime = (new Date()).getTime();

    setInterval(() => {
      const currentTime = new Date().getTime();
      if (currentTime > (lastTime + timeout + 2000)) {
        // if device wake up (from sleep state) and user is logged in restore web socket connection
        // and also check additionally if ban status has changed via banService method
        if (this.isLoggedIn) {
          this.webSocketService.connect();
          setTimeout(() => {
            this.checkIfBanStatusHasChangedWhenAppWasClosed();
          }, 5000);
        }
      }
      lastTime = currentTime;
    }, timeout);
  }

  @HostListener('window:beforeunload')
  beforeUnloadTabHandler() {
    this.localStorageService.decreaseNumberOfOpenedTabs();
    const numberOfOpenedTabsLeft = this.localStorageService.getNumberOfOpenedTabs();
    /**
     * Application cannot distinguish between the following operations:
     * - closing last tab,
     * - refreshing last tab.
     * Both of the events triggered window:beforeunload.
     * So if remember me isn't checked app doesn't know if it should log out user or not (it should happened only
     * when last tab is CLOSED not refreshed).
     * Solution to resolve this is to set test variable in session storage (which can survive refreshing,
     * NOT closing tab), and copy whole local storage (which store signed in user data) to session storage.
     * After refresh in constructor there is checking if this test variable remained. If so it means that the last
     * tab has been refreshed and logged user data will be restored from session storage to local storage.
     * */
    if (numberOfOpenedTabsLeft <= 0 && this.localStorageService.isLoggedIn()) {
      this.sessionStorageService.setTestVariableToCheckIfLastTabHasBeenRefreshed();
      this.sessionStorageService.copyLocalStorageToSessionStorage();
      // in case when signed in user closing last tab (without remember me checked)
      // app will clear his logged in session data from localstorage,
      // also session storage will be lost so he'll be logout
      if (!this.localStorageService.isRememberMeChecked()) {
        this.localStorageService.signOut();
      }
    }
  }

  @HostListener('window:storage', ['$event'])
  onLocalStorageChange(storageEvent: StorageEvent) {
    if (storageEvent.storageArea == localStorage) {
      setTimeout(() => {
        // if storage was cleared in main tab others tab will
        // know that by checking login status
        const hasUserBeenLogout = !this.localStorageService.isLoggedIn();
        // situation when tricky user opened more than one sign-in tab and
        // logged on more than one account simultaneously
        const hasUserLoggedOnMoreThanOneAccount = (this.userName != '') && (this.userName != this.localStorageService.getUsername());

        if (hasUserBeenLogout || hasUserLoggedOnMoreThanOneAccount) {
          this.signOutService.emitSignOut();
        }
      }, 200);
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyedNotifier.next();
    this.componentDestroyedNotifier.complete();
  }
}
