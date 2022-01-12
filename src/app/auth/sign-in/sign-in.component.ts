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

  showAccountIsLocked: boolean = false;
  showLoginWasFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router,
              private localStorageService: LocalStorageService, private signInService: SignInService) {
  }

  signIn() {
    const {username, password} = this.form;

    this.authService.signIn(username, password).subscribe(
      (data) => {
        console.log(data)
        this.localStorageService.saveAccessToken(data.accessToken);
        this.localStorageService.saveRefreshToken(data.refreshToken);
        this.localStorageService.saveUsername((JSON.parse(atob(data.accessToken.split('.')[1]))).sub);
        const testExpToken = (JSON.parse(atob(data.accessToken.split('.')[1]))).exp;
        this.localStorageService.saveExpirationTime(testExpToken);
        this.localStorageService.saveRememberMe(this.rememberMe);

        console.log("Expiration: " + testExpToken);
        const encodedPayload = data.accessToken.split('.')[1];
        console.log("Encoed payload: " + encodedPayload);
        const iat = (JSON.parse(atob(data.accessToken.split('.')[1]))).iat;
        console.log("Issued at: " + iat);
        const sub = (JSON.parse(atob(data.accessToken.split('.')[1]))).sub;
        console.log("Sub: " + sub);
        // const scope = (JSON.parse(atob(data.token.split('.')[1]))).scope;
        // console.log("Scope: " + scope);
        //
        // console.log("data in nnnn :" + data.expirationTime)
        // this.tokenStorage.saveExpirationTime(data.expirationTime);

        //TODO for test only!
        // this.tokenStorage.saveExpirationTime(500);

        // this.tokenStorage.saveUser(data);
        // this.tokenStorage.saveExpirationTimeBetter(testExpToken);
        console.log("This is the token: " + data.accessToken);
        console.log("This is the user  " + data);

        this.signInService.emitSignIn();

        this.router.navigate(['topic-categories']);

        // TODO it could also emit login event?
        // window.location.reload();
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
