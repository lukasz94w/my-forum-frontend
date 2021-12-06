import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChangePassword} from "../model/change-password";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  updateProfilePic(image: File): Observable<any> {
    let formData = new FormData();

    formData.append("image", image);
    console.log("hello")
    console.log(image)
    console.log(formData)

    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    }

    // return this.httpClient.post(`${this.apiServerUrl}/user/updateProfilePic`, image, { headers: {'Content-Type': 'multipart/form-data'}});

    return this.httpClient.post(`${this.apiServerUrl}/user/updateProfilePic`, image, {observe: 'response'});
  }

  changePassword(changePassword: ChangePassword): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/user/changePassword`, changePassword)
  }
}
