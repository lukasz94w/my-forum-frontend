import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ChangePasswordThroughEmail} from "../model/request/change-password-through-email";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/auth/signIn`, {username, password});
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/auth/signUp`, {username, email, password});
  }

  askForEmailWithResetToken(email: string): Observable<void> {
    return this.httpClient.post<void>(`${this.apiServerUrl}/auth/sendEmailWithResetToken`, {email, apiServerUrl: this.apiServerUrl});
  }

  changePassword(changedPasswordWithToken: ChangePasswordThroughEmail): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/auth/changePassword`, changedPasswordWithToken);
  }
}
