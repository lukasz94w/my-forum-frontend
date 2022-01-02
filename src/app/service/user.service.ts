import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChangePasswordThroughUserSettings} from "../model/request/change-password-through-user-settings";
import {User} from "../model/response/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  // updateProfilePic(image: File): Observable<any> {
  //   let formData = new FormData();
  //
  //   formData.append("image", image);
  //   console.log("hello")
  //   console.log(image)
  //   console.log(formData)
  //
  //   const HttpUploadOptions = {
  //     headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
  //   }
  //
  //   // return this.httpClient.post(`${this.apiServerUrl}/user/updateProfilePic`, image, { headers: {'Content-Type': 'multipart/form-data'}});
  //
  //   return this.httpClient.post(`${this.apiServerUrl}/user/updateProfilePic`, image, {observe: 'response'});
  // }

  changeProfilePic(imageAsRequestBody: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/user/changeProfilePic`, imageAsRequestBody)
  }

  getProfilePic(): Observable<any> {
    return this.httpClient.get(`${this.apiServerUrl}/user/getProfilePic`)
  }

  getUserInfo(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiServerUrl}/user/getUserInfo/${username}`)
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

}
