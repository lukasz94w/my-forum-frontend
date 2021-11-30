import {Injectable} from '@angular/core';
import * as moment from "moment";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";
const EXPIRATION_TIME = "expires_at"

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  saveExpirationTime(expirationTime: number): void {
    const expiresAt = moment().add(expirationTime, 'second');


    console.log("Expires at old method: " + expiresAt);


    window.sessionStorage.setItem(EXPIRATION_TIME, JSON.stringify(expiresAt.valueOf()));
  }

  getExpirationTime(): any {
    const expiration = window.sessionStorage.getItem(EXPIRATION_TIME);

    if(expiration) {
      return JSON.parse(expiration);
    }

    return {};
  }

  public isLoggedIn() {
    // const expiry = parseInt(<string>window.sessionStorage.getItem(EXPIRATION_TIME));
    //
    //
    // // console.log("Expiry at: " + expiry);
    //
    // // console.log("Date now: " + Date.now);
    //
    // console.log("Date now: " + Date.now());
    //
    // return Date.now() > (expiry * 1000);

    // return moment().isBefore(expiry);
    // return (Math.floor((new Date).getTime() / 1000)) >= expiry;

    return moment().isBefore(this.getExpirationTime());
  }

  signOut() {
    window.sessionStorage.clear();
  }

  saveExpirationTimeBetter(testExpToken: any) {

    // console.log("Expiration time new method: " + testExpToken);
    //
    // console.log("Expiration time new method after multiply: " + testExpToken * 1000)
    //
    // window.sessionStorage.setItem(EXPIRATION_TIME, testExpToken);
  }
}
