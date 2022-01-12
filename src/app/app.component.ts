import {Component, HostListener, OnInit} from '@angular/core';
import {LocalStorageService} from "./service/local-storage.service";
import {SignInService} from "./service/event/sign-in.service";
import {SignOutService} from "./service/event/sign-out.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;
  userName: string = '';
  autoLogoutTimeoutReference: any;

  constructor(private localStorageService: LocalStorageService, private signInService: SignInService,
              private signOutService: SignOutService) {
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
    const timeoutToAutomaticLogoutInMs = this.localStorageService.getExpirationTime() - Math.floor(Date.now() / 1000);
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

  @HostListener('window:storage', ['$event'])
  onLocalStorageChange(storageEvent: StorageEvent) {
    if (storageEvent.storageArea == localStorage) {
      // if storage was cleared in main tab others tab will
      // know that by checking login status using local storage
      // then logged out event will be sent
      let wasUserLoggedOut = !this.localStorageService.isLoggedIn();

      if (wasUserLoggedOut) {
        this.signOutService.emitSignOut();
        // TODO chyba trzeba logout ze wzgledu na auth guard a moze sprawdzac czy jest ta strone z url i jak
        // wtedy to wtedy przekierowywac do topic-categories
      }
    }
  }

}
