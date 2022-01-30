import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../service/local-storage.service";
import {HttpStatusCode} from "@angular/common/http";
import {SignInService} from "../../service/event/sign-in.service";

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  form: any = {
    username: null, password: null
  }
  rememberMe: boolean = false;

  showAccountIsNotActivated: boolean = false;
  showLoginWasFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router,
              private localStorageService: LocalStorageService, private signInService: SignInService) {
  }

  signIn() {
    const {username, password} = this.form;
    this.authService.signIn(username, password).subscribe(
      (data) => {
        this.localStorageService.saveAccessToken(data.accessToken);
        this.localStorageService.saveRefreshToken(data.refreshToken);
        this.localStorageService.saveUserName(JSON.parse(atob(data.accessToken.split('.')[1])).sub);
        this.localStorageService.saveIsUserAdmin(JSON.parse(atob(data.accessToken.split(".")[1])).isAdmin);
        this.localStorageService.saveRefreshTokenExpirationTime((JSON.parse(atob(data.refreshToken.split('.')[1]))).exp);
        this.localStorageService.saveRememberMe(this.rememberMe);
        this.signInService.emitSignIn();
        this.router.navigate(['topic-categories']);
      },
      (error) => {
        switch (error.status) {
          case HttpStatusCode.TooEarly: {
            this.showAccountIsNotActivated = true;
            this.showLoginWasFailed = false;
            break;
          }
          case HttpStatusCode.Locked: {
            // TODO tu bedzie info ze ban i bedzie pobierany username i data do kiedy ban
            // i bedzie mozna pokazywac dane usera poniewaz bedzie username xd
            break;
          }
          case HttpStatusCode.Forbidden: {
            this.showLoginWasFailed = true;
            this.showAccountIsNotActivated = false;
            break;
          }
        }
      }
    )
  }
}
