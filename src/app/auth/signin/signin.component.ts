import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token/token-storage.service";
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: any = {
    username: null, password: null
  }

  isLoginFailed = false;

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const {username, password} = this.form;
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);


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
        this.tokenStorage.saveUser(data);

        this.tokenStorage.saveExpirationTimeBetter(testExpToken);


        console.log("This is the token: " + data.token);
        console.log("This is the user  " + data);

        this.navigateToTopicsList();
      },
      err => {
        this.isLoginFailed = true;
        this.reloadPage();
      }
    )
    return false;
  }

  navigateToTopicsList(): void {
    setTimeout(() => {
        this.router.navigate(['topic-list'])
      }, 1000
    )
  }

  reloadPage(): void {
    setTimeout(() => {
        window.location.reload();
      }, 2000
    )
  }
}
