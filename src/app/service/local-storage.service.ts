import {Injectable} from '@angular/core';

const ACCESS_TOKEN_KEY = "access-token"
const REFRESH_TOKEN_KEY = "refresh-token"
const USER_KEY = "auth-user"
const EXPIRATION_TIME = "expires-at"
const REMEMBER_ME = "remember-me"
const IS_USER_ADMIN = "is-user-admin"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveAccessToken(accessToken: string): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  getAccessToken(): string {
    return String(localStorage.getItem(ACCESS_TOKEN_KEY));
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  getRefreshToken(): string {
    return String(localStorage.getItem(REFRESH_TOKEN_KEY));
  }

  saveUserName(userName: string): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, userName);
  }

  getUsername(): string {
    return String(localStorage.getItem(USER_KEY));
  }

  saveIsUserAdmin(isAdmin: boolean): void {
    localStorage.setItem(IS_USER_ADMIN, JSON.stringify(isAdmin));
  }

  isUserAdmin(): boolean {
    return localStorage.getItem(IS_USER_ADMIN) === 'true';
  }

  saveRefreshTokenExpirationTime(refreshTokenExpirationTime: number): void {
    localStorage.setItem(EXPIRATION_TIME, String(refreshTokenExpirationTime));
  }

  getRefreshTokenExpirationTime(): number {
    return Number(localStorage.getItem(EXPIRATION_TIME));
  }

  isLoggedIn(): boolean {
    return this.isUserNameInLocalStorage() && this.isRefreshTokenExpired();
  }

  private isUserNameInLocalStorage(): boolean {
    const userName = localStorage.getItem(USER_KEY);
    return userName !== null;
  }

  private isRefreshTokenExpired(): boolean {
    const expirationTime = this.getRefreshTokenExpirationTime();
    if (expirationTime !== null) {
      const expiryDateTimeOfTokenInUnix = parseInt(String(expirationTime));
      const currentDateTimeInUnix = (Math.floor(Date.now() / 1000));
      return currentDateTimeInUnix < expiryDateTimeOfTokenInUnix;
    }

    return false;
  }

  signOut() {
    localStorage.clear();
  }

  isRememberMeChecked(): boolean {
    return localStorage.getItem(REMEMBER_ME) === 'true';
  }

  saveRememberMe(rememberMe: boolean): void {
    localStorage.setItem(REMEMBER_ME, JSON.stringify(rememberMe));
  }
}
