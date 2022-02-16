import {Injectable} from '@angular/core';

const ACCESS_TOKEN = "access-token"
const REFRESH_TOKEN = "refresh-token"
const USER_NAME = "user-name"
const REFRESH_TOKEN_EXPIRATION_TIME = "refresh-token-expiration-time"
const BAN_EXPIRATION_TIME = "ban-expiration-time"
const IS_USER_ADMIN = "is-user-admin"
const WAS_ALERT_BAN_SHOWN = "was-alert-ban-shown"
const REMEMBER_ME = "remember-me"

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

  public isUserWithoutBanLoggedIn() {
    return this.isUserNameInLocalStorage() && this.isRefreshTokenExpired()
  }

  public isUserWithBanLoggedIn() {
    return this.isUserNameInLocalStorage() && this.isDateOfBanExpired()
  }

  private isUserNameInLocalStorage(): boolean {
    const userName = localStorage.getItem(USER_NAME);
    return userName !== null;
  }

  getTimeToAutoLogout(): number {
    return this.getRefreshTokenExpirationTime() || this.getBanExpirationTime();
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

  saveAlertBanHasBeenShown() {
    localStorage.removeItem(WAS_ALERT_BAN_SHOWN);
    localStorage.setItem(WAS_ALERT_BAN_SHOWN, String(true));
  }

  hasAlertBanBeenShown() {
    return localStorage.getItem(WAS_ALERT_BAN_SHOWN) === 'true';
  }

  signOut() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(REFRESH_TOKEN_EXPIRATION_TIME);
    localStorage.removeItem(BAN_EXPIRATION_TIME);
    localStorage.removeItem(IS_USER_ADMIN);
    localStorage.removeItem(REMEMBER_ME);
  }

  saveRememberMe(rememberMe: boolean): void {
    localStorage.removeItem(REMEMBER_ME);
    localStorage.setItem(REMEMBER_ME, JSON.stringify(rememberMe));
  }

  isRememberMeChecked(): boolean {
    return localStorage.getItem(REMEMBER_ME) === 'true';
  }
}
