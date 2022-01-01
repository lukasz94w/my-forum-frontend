import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
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
    const email = this.form;
    //it is intentionally not observable to not reveal if such mail exists in the database
    this.authService.reset(email);
    this.showMessageAboutSendingResetEmail = true;
    this.navigateToMainPage();
  }

  navigateToMainPage(): void {
    setTimeout(() => {
      this.router.navigate(['topic-categories'])
    }, 5000);
  }
}
