import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChangePassword} from "../model/change-password";
import {Topic} from "../model/topic";

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

  changePassword(changePassword: ChangePassword): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/user/changePassword`, changePassword)
  }

  findPageablePostsByUser(params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/user/findPageablePostsByUser`, {params});
  }
}
