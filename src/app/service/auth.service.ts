import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ChangePasswordViaEmailLink} from "../model/request/change-password-via-email-link";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  signIn(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/auth/signIn`, {username, password});
  }

  signUp(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/auth/signUp`, {username, email, password});
  }

  refreshToken(refreshToken: string) {
    return this.httpClient.post(`${this.apiServerUrl}/auth/refreshToken`, {refreshToken: refreshToken});
  }

  askForEmailWithResetLink(email: string): Observable<void> {
    return this.httpClient.post<void>(`${this.apiServerUrl}/auth/resetPassword`, {email, apiServerUrl: this.apiServerUrl});
  }

  changePassword(changedPasswordWithToken: ChangePasswordViaEmailLink): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/auth/changePassword`, changedPasswordWithToken);
  }

  activateAccount(params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/auth/activateAccount/`, {params});
  }

  resendActivationToken(params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/auth/resendActivationToken/`, {params});
  }
}
