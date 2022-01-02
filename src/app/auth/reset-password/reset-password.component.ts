import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  showMessageAboutSendingResetEmail: boolean = false;

  form: any = {
    email: null
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  onResetPassword() {
    const {email} = this.form;
    //1.it is intentionally that observable doesn't
    //return any result to not reveal if such mail exists in the database
    //2.the Observable returned by any of the Http operations (get/post/put/etc) require a subscription.
    this.authService.askForEmailWithResetToken(email).subscribe();
    this.showMessageAboutSendingResetEmail = true;
    this.navigateToMainPage();
  }

  navigateToMainPage(): void {
    setTimeout(() => {
      this.router.navigate(['topic-categories'])
    }, 5000);
  }
}
