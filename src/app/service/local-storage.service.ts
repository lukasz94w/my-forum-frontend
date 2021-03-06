import {Injectable} from '@angular/core';

const ACCESS_TOKEN = "access-token"
const REFRESH_TOKEN = "refresh-token"
const USER_NAME = "user-name"
const REFRESH_TOKEN_EXPIRATION_TIME = "refresh-token-expiration-time"
const BAN_EXPIRATION_TIME = "ban-expiration-time"
const IS_USER_ADMIN = "is-user-admin"
const REMEMBER_ME = "remember-me"
const NUMBER_OF_OPENED_TABS = "number-of-opened-tabs"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveAccessToken(accessToken: string): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  getAccessToken(): string {
    return String(localStorage.getItem(ACCESS_TOKEN));
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  getRefreshToken(): string {
    return String(localStorage.getItem(REFRESH_TOKEN));
  }

  saveUserName(userName: string): void {
    localStorage.removeItem(USER_NAME);
    localStorage.setItem(USER_NAME, userName);
  }

  getUsername(): string {
    return String(localStorage.getItem(USER_NAME));
  }

  saveIsUserAdmin(isAdmin: boolean): void {
    localStorage.removeItem(IS_USER_ADMIN);
    localStorage.setItem(IS_USER_ADMIN, JSON.stringify(isAdmin));
  }

  isUserAdmin(): boolean {
    return localStorage.getItem(IS_USER_ADMIN) === 'true';
  }

  saveRefreshTokenExpirationTime(refreshTokenExpirationTime: number): void {
    localStorage.removeItem(REFRESH_TOKEN_EXPIRATION_TIME);
    localStorage.setItem(REFRESH_TOKEN_EXPIRATION_TIME, String(refreshTokenExpirationTime));
  }

  saveBanExpirationTime(dateOfBanAsUnix: number) {
    localStorage.removeItem(BAN_EXPIRATION_TIME)
    localStorage.setItem(BAN_EXPIRATION_TIME, String(dateOfBanAsUnix));
  }

  getRefreshTokenExpirationTime(): number {
    return Number(localStorage.getItem(REFRESH_TOKEN_EXPIRATION_TIME));
  }

  getBanExpirationTime(): number {
    return Number(localStorage.getItem(BAN_EXPIRATION_TIME));
  }

  isLoggedIn(): boolean {
    return this.isUserWithBanLoggedIn() || this.isUserWithoutBanLoggedIn();
  }

  isUserWithoutBanLoggedIn() {
    return this.isUserNameInLocalStorage() && this.isRefreshTokenExpired()
  }

  isUserWithBanLoggedIn() {
    return this.isUserNameInLocalStorage() && this.isDateOfBanExpired()
  }

  private isUserNameInLocalStorage(): boolean {
    const userName = localStorage.getItem(USER_NAME);
    return userName !== null;
  }

  private isRefreshTokenExpired(): boolean {
    const expirationTime = this.getRefreshTokenExpirationTime();
    return this.checkIfUnixTimeStampIsExpired(expirationTime);
  }

  private isDateOfBanExpired(): boolean {
    const dateOfBan = this.getBanExpirationTime();
    return this.checkIfUnixTimeStampIsExpired(dateOfBan);
  }

  private checkIfUnixTimeStampIsExpired(unixTimeStamp: number): boolean {
    if (unixTimeStamp !== null) {
      const parsedUnixTimeStamp = parseInt(String(unixTimeStamp));
      const currentDateTimeInUnix = (Math.floor(Date.now() / 1000));
      return currentDateTimeInUnix < parsedUnixTimeStamp;
    }

    return false;
  }

  signOut() {
    localStorage.clear();
  }

  saveRememberMe(rememberMe: boolean): void {
    localStorage.removeItem(REMEMBER_ME);
    localStorage.setItem(REMEMBER_ME, JSON.stringify(rememberMe));
  }

  isRememberMeChecked(): boolean {
    return localStorage.getItem(REMEMBER_ME) === 'true';
  }

  increaseNumberOfOpenedTabs(): void {
    let numberOfOpenedTabs = localStorage.getItem(NUMBER_OF_OPENED_TABS) || 0
    if (numberOfOpenedTabs <= -1) {
      numberOfOpenedTabs = 0;
    }
    localStorage.setItem(NUMBER_OF_OPENED_TABS, (Number(numberOfOpenedTabs) + 1).toString())
  }

  decreaseNumberOfOpenedTabs(): void {
    let numberOfOpenedTabs = Number(localStorage.getItem(NUMBER_OF_OPENED_TABS));
    localStorage.setItem(NUMBER_OF_OPENED_TABS, (Number(numberOfOpenedTabs) - 1).toString())
  }

  getNumberOfOpenedTabs(): Number {
    return Number(localStorage.getItem(NUMBER_OF_OPENED_TABS));
  }

  restoreLocalStorageFromSessionStorage() {
    this.saveAccessToken(String(sessionStorage.getItem(ACCESS_TOKEN)))
    this.saveRefreshToken(String(sessionStorage.getItem(REFRESH_TOKEN)));
    this.saveUserName(String(sessionStorage.getItem(USER_NAME)));
    this.saveIsUserAdmin(sessionStorage.getItem(IS_USER_ADMIN) === 'true');
    this.saveRefreshTokenExpirationTime(Number(sessionStorage.getItem(REFRESH_TOKEN_EXPIRATION_TIME)));
    this.saveBanExpirationTime(Number(sessionStorage.getItem(BAN_EXPIRATION_TIME)));
  }
}
