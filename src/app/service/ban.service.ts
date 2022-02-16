import { Injectable } from '@angular/core';
import {Ban} from "../model/request/ban";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BanService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  banUser(ban: Ban): Observable<any> {
    return this.httpClient.put<any>(`${this.apiServerUrl}/ban/banUser`, ban);
  }

  unBanUser(unBannedUserName: string) {
    return this.httpClient.put<any>(`${this.apiServerUrl}/ban/unBanUser`, unBannedUserName);
  }

  checkBanStatus(userName: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiServerUrl}/ban/checkBanStatus/` + userName);
  }
}
