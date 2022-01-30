import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChangePasswordThroughUserSettings} from "../model/request/change-password-through-user-settings";
import {Ban} from "../model/request/ban";
import {User2} from "../model/response/user2";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  changeProfilePic(imageAsRequestBody: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/user/changeProfilePic`, imageAsRequestBody)
  }

  getProfilePic(): Observable<any> {
    return this.httpClient.get(`${this.apiServerUrl}/user/getProfilePic`)
  }

  getUserInfo(username: string): Observable<User2> {
    return this.httpClient.get<User2>(`${this.apiServerUrl}/user/getUserInfo/${username}`)
  }

  changePassword(changePassword: ChangePasswordThroughUserSettings): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/user/changePassword`, changePassword)
  }

  findPageablePostsByUser(params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/user/findPageablePostsByUser`, {params});
  }

  findPageableTopicsByUser(params: { page: number; username: string }): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/user/findPageableTopicsByUser`, {params})
  }

  findPageableUsers(params: { page: number }): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/user/findPageableUsers`, {params})
  }

  banUser(ban: Ban): Observable<any> {
    return this.httpClient.post<any>(`${this.apiServerUrl}/user/banUser`, ban);
  }

  unBanUser(unBannedUserName: string) {
    return this.httpClient.post<any>(`${this.apiServerUrl}/user/unBanUser`, unBannedUserName);
  }
}
