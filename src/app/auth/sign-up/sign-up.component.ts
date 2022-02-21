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

  wasSignUpSuccessful: boolean = false;
  wasSignupUnsuccessful: boolean = false;
  message: string = '';

  constructor(private authService: AuthService) {
  }

  signUp(): void {
    this.resetFlags();
    const {username, email, password} = this.form;
    this.authService.signUp(username, email, password).subscribe(
      (response) => {
        this.message = response.message;
        this.wasSignUpSuccessful = true;
      },
      (error) => {
        this.message = error.error.message;
        this.wasSignupUnsuccessful = true;
      }
    )
  }

  resetFlags() {
    this.wasSignupUnsuccessful = false;
    this.wasSignUpSuccessful = false;
  }
}
