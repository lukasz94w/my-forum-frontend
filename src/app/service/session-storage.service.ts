import {Injectable} from '@angular/core';

const ACCESS_TOKEN = "access-token"
const REFRESH_TOKEN = "refresh-token"
const USER_NAME = "user-name"
const REFRESH_TOKEN_EXPIRATION_TIME = "refresh-token-expiration-time"
const BAN_EXPIRATION_TIME = "ban-expiration-time"
const IS_USER_ADMIN = "is-user-admin"
const TEST_VARIABLE_TO_CHECK_IF_LAST_TAB_HAS_BEEN_REFRESHED = "test-variable-to-check-if-last-tab-has-been-refreshed"

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  setTestVariableToCheckIfLastTabHasBeenRefreshed(): void {
    sessionStorage.removeItem(TEST_VARIABLE_TO_CHECK_IF_LAST_TAB_HAS_BEEN_REFRESHED);
    sessionStorage.setItem(TEST_VARIABLE_TO_CHECK_IF_LAST_TAB_HAS_BEEN_REFRESHED, String(true));
  }

  checkIfLastTabHasBeenRefreshed(): boolean {
    return sessionStorage.getItem(TEST_VARIABLE_TO_CHECK_IF_LAST_TAB_HAS_BEEN_REFRESHED) === 'true';
  }

  copyLocalStorageToSessionStorage(): void {
    sessionStorage.setItem(ACCESS_TOKEN, (String(localStorage.getItem(ACCESS_TOKEN))));
    sessionStorage.setItem(REFRESH_TOKEN, (String(localStorage.getItem(REFRESH_TOKEN))));
    sessionStorage.setItem(USER_NAME, (String(localStorage.getItem(USER_NAME))));
    sessionStorage.setItem(IS_USER_ADMIN, (String(localStorage.getItem(IS_USER_ADMIN))));
    sessionStorage.setItem(REFRESH_TOKEN_EXPIRATION_TIME, (String(localStorage.getItem(REFRESH_TOKEN_EXPIRATION_TIME))));
    sessionStorage.setItem(BAN_EXPIRATION_TIME, (String(localStorage.getItem(BAN_EXPIRATION_TIME))));
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }
}
