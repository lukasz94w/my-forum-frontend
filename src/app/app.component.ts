import {Component, HostListener, OnInit} from '@angular/core';
import {LocalStorageService} from "./service/local-storage.service";
import {SignInService} from "./service/event/sign-in.service";
import {SignOutService} from "./service/event/sign-out.service";
import {TopicService} from "./service/topic.service";
import {PostService} from "./service/post.service";
import {Router} from "@angular/router";

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

  constructor(private localStorageService: LocalStorageService, private signInService: SignInService,
              private signOutService: SignOutService, private topicService: TopicService,
              private postService: PostService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.localStorageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userName = this.localStorageService.getUsername();
      this.setTimeoutToAutoLogout();
    }

    this.signInService.signInEvent$.subscribe(
      () => {
        this.isLoggedIn = true;
        this.setTimeoutToAutoLogout();
        this.userName = this.localStorageService.getUsername();
      }
    )

    this.signOutService.signOutEvent$.subscribe(
      () => {
        this.isLoggedIn = false
        clearTimeout(this.autoLogoutTimeoutReference);
      }
    );
  }

  private setTimeoutToAutoLogout(): void {
    const timeoutToAutomaticLogoutInMs = this.localStorageService.getRefreshTokenExpirationTime() - Math.floor(Date.now() / 1000);
    this.autoLogoutTimeoutReference = setTimeout(() => {
      alert("Session has ended. Please login again")
      this.localStorageService.signOut();
      this.signOutService.emitSignOut();
    }, timeoutToAutomaticLogoutInMs * 1000);
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
