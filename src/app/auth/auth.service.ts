import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/auth/signup`, {username, email, password});
  }
}
