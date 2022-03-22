import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../service/local-storage.service";
import {HttpStatusCode} from "@angular/common/http";
import {SignInEvent} from "../../event/sign-in-event.service";
import {TextProviderService} from "../../service/text-provider.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  form: any = {
    username: null, password: null
  }
  rememberMe: boolean = false;

  showSignInFailedMessage: boolean = false;
  signInFailedMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private textProviderService: TextProviderService,
              private localStorageService: LocalStorageService, private signInEvent: SignInEvent) {
  }

  signIn(ngForm: NgForm) {
    const {username, password} = this.form;
    this.authService.signIn(username, password).subscribe(
      (data) => {
        this.localStorageService.saveAccessToken(data.accessToken);
        this.localStorageService.saveRefreshToken(data.refreshToken);
        this.localStorageService.saveUserName(JSON.parse(atob(data.accessToken.split('.')[1])).sub);
        this.localStorageService.saveIsUserAdmin(JSON.parse(atob(data.accessToken.split(".")[1])).isAdmin);
        this.localStorageService.saveRefreshTokenExpirationTime((JSON.parse(atob(data.refreshToken.split('.')[1]))).exp);
        this.localStorageService.saveRememberMe(this.rememberMe);
        this.signInEvent.emitSignIn();
        this.router.navigate(['topic-categories']);
      },
      (error) => {
        switch (error.status) {
          case HttpStatusCode.TooEarly:
          case HttpStatusCode.Forbidden: {
            this.showSignInFailedMessage = true;
            this.signInFailedMessage = error.error.message;
            break;
          }
          case HttpStatusCode.Locked: {
            this.localStorageService.saveUserName(error.error.parametersMap.userName);
            this.localStorageService.saveBanExpirationTime(error.error.parametersMap.dateOfBan);
            this.localStorageService.saveRememberMe(this.rememberMe);
            this.signInEvent.emitSignIn();
            // show ban message
            alert(error.error.message);
            this.router.navigate(['topic-categories']);
            break;
          }
        }
        ngForm.resetForm();
      }
    )
  }
}
