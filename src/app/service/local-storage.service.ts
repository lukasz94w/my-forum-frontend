import {Injectable} from '@angular/core';

const ACCESS_TOKEN_KEY = "access-token-key"
const REFRESH_TOKEN_KEY = "refresh-token-key"
const USER_KEY = "auth-user"
const EXPIRATION_TIME = "expires-at"
const REMEMBER_ME = "remember-me"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveAccessToken(token: string): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  saveUsername(user: string): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUsername(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  saveExpirationTime(expirationTime: number): void {
    localStorage.setItem(EXPIRATION_TIME, String(expirationTime));
  }

  getExpirationTime(): any {
    const expiration = localStorage.getItem(EXPIRATION_TIME);

    if (expiration) {
      return JSON.parse(expiration);
    }

    return {};
  }

  isLoggedIn(): boolean {
    //TODO tu trzeba srpawdzac jeszcze czy token jakis jest wogole jest (ale jaki?)
    return this.isRefreshTokenExpired();
  }

  private isRefreshTokenExpired() {
    const expiryDateTimeOfTokenInUnix = parseInt(this.getExpirationTime());
    const currentDateTimeInUnix = (Math.floor(Date.now() / 1000));
    return currentDateTimeInUnix < expiryDateTimeOfTokenInUnix;
  }

  signOut() {
    localStorage.clear();
  }

  isRememberMeChecked(): boolean {
    return localStorage.getItem(REMEMBER_ME) === 'true';
  }

  saveRememberMe(rememberMe: boolean) {
    localStorage.setItem(REMEMBER_ME, JSON.stringify(rememberMe));
  }

}
