import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storage.service";
import * as jwt_decode from 'jwt-decode';
import {HttpStatusCode} from "@angular/common/http";


@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  form: any = {
    username: null, password: null
  }

  showAccountIsLocked: boolean = false;
  showLoginWasFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
  }

  onSubmit() {
    const {username, password} = this.form;
    this.authService.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername((JSON.parse(atob(data.token.split('.')[1]))).sub);
        const testExpToken = (JSON.parse(atob(data.token.split('.')[1]))).exp;
        console.log("Expiration: " + testExpToken);
        const encodedPayload = data.token.split('.')[1];
        console.log("Encoed payload: " + encodedPayload);
        const iat = (JSON.parse(atob(data.token.split('.')[1]))).iat;
        console.log("Issued at: " + iat);
        const sub = (JSON.parse(atob(data.token.split('.')[1]))).sub;
        console.log("Sub: " + sub);
        const scope = (JSON.parse(atob(data.token.split('.')[1]))).scope;
        console.log("Scope: " + scope);
        this.tokenStorage.saveExpirationTime(data.expirationTime);
        // this.tokenStorage.saveUser(data);
        this.tokenStorage.saveExpirationTimeBetter(testExpToken);
        console.log("This is the token: " + data.token);
        console.log("This is the user  " + data);
        this.router.navigate(['topic-categories']);
      },
      (error) => {
        if (error.status == HttpStatusCode.Locked) {
          this.showAccountIsLocked = true;
          this.showLoginWasFailed = false;
        } else {
          this.showLoginWasFailed = true;
          this.showAccountIsLocked = false;
        }
      }
    )

  }

}