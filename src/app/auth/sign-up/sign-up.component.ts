import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  }

  isSignUpSuccess: boolean = false;
  successMessage: string = '';

  isSignupFailed: boolean = false;
  errorMessage: string = '';

  showLoadingMessage: boolean = false;

  constructor(private authService: AuthService) {
  }

  signUp(): void {
    this.resetFlags();
    const {username, email, password} = this.form;
    this.authService.signUp(username, email, password).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.isSignUpSuccess = true;
        this.showLoadingMessage = false
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.isSignupFailed = true;
        this.showLoadingMessage = false
      }
    )
  }

  resetFlags() {
    this.showLoadingMessage = true;
    this.isSignupFailed = false;
    this.isSignUpSuccess = false;
  }
}
