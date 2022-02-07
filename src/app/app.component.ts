import {Component, HostListener, OnInit} from '@angular/core';
import {LocalStorageService} from "./service/local-storage.service";
import {SignInEvent} from "./event/sign-in-event.service";
import {SignOutEvent} from "./event/sign-out-event.service";
import {TopicService} from "./service/topic.service";
import {PostService} from "./service/post.service";
import {Router} from "@angular/router";
import {WebSocketService} from "./service/web-socket.service";
import {BanService} from "./service/ban.service";
import {TextProviderService} from "./service/text-provider.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;
  userName: string = '';
  autoLogoutTimeoutReference: any;
  searchCriteria: string = 'topics';

  constructor(private localStorageService: LocalStorageService, private signInService: SignInEvent,
              private signOutService: SignOutEvent, private topicService: TopicService,
              private postService: PostService, private router: Router, private banService: BanService,
              private webSocketService: WebSocketService, private textProviderService: TextProviderService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.localStorageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.setLoggedInData();
      this.checkIfBanStatusHasChangedWhenAppWasClosed();
    }

    this.signInService.signInEvent$.subscribe(
      () => {
        this.isLoggedIn = true;
        this.setLoggedInData();
      }
    )

    this.signOutService.signOutEvent$.subscribe(
      () => {
        this.isLoggedIn = false
        clearTimeout(this.autoLogoutTimeoutReference);
        this.webSocketService.disconnect();
        this.localStorageService.signOut();
      }
    );

    this.wakeUpObserver();
  }

  private setTimeoutToAutoLogout(): void {
    // when user is not banned auto logout time is defined by refresh token expiration time
    // other way user would be logout when the ban ends
    const timeoutToAutomaticLogoutInSec = this.localStorageService.getTimeToAutoLogout() - Math.floor(Date.now() / 1000);
    this.autoLogoutTimeoutReference = setTimeout(() => {
      alert("Session has ended. Please login again")
      this.localStorageService.signOut();
      this.signOutService.emitSignOut();
    }, timeoutToAutomaticLogoutInSec * 1000);
  }

  signOut() {
    this.isLoggedIn = false;
    this.localStorageService.signOut();
    this.signOutService.emitSignOut();
  }

  searchCriteriaChanged(searchCriteria: string) {
    this.searchCriteria = searchCriteria.toLowerCase();
  }

  search(searchQuery: string) {
    if (this.searchCriteria === 'topics') {
      this.router.navigate(['topic-list/search'], {queryParams: {query: searchQuery}});
    } else {
      this.router.navigate(['post-list'], {queryParams: {query: searchQuery}});
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
    this.setTimeoutToAutoLogout();
    this.userName = this.localStorageService.getUsername();
    this.webSocketService.connect();
  }

  private wakeUpObserver() {
    const timeout = 5000;
    let lastTime = (new Date()).getTime();

    setInterval(() => {
      const currentTime = new Date().getTime();
      if (currentTime > (lastTime + timeout + 2000)) {
        // if device wake up (from sleep state) and user is logged check if user is still logged in
        // try to restore web socket connection and also check additionally if ban status has changed
        // via banService method
        if (this.isLoggedIn) {
          this.isLoggedIn = this.localStorageService.isLoggedIn();
          this.webSocketService.connect();
          setTimeout(() => {
              this.checkIfBanStatusHasChangedWhenAppWasClosed();
            }, 5000);
        }
      }
      lastTime = currentTime;
    }, timeout);
  }

  @HostListener('window:storage', ['$event'])
  onLocalStorageChange(storageEvent: StorageEvent) {
    if (storageEvent.storageArea == localStorage) {
      // if storage was cleared in main tab others tab will
      // know that by checking login status
      const wasUserLoggedOut = !this.localStorageService.isLoggedIn();
      // situation when tricky user opened more than one sign-in tab and
      // logged on more than one account simultaneously
      const hasUserLoggedOnMoreThanOneAccount = this.userName != this.localStorageService.getUsername();

      if (wasUserLoggedOut || hasUserLoggedOnMoreThanOneAccount) {
        this.signOutService.emitSignOut();
      }
    }
  }
}
