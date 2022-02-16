import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  showSuccessMessage: boolean = false;

  form: any = {
    email: null
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  onResetPassword(): void {
    const {email} = this.form;
    // it is intentionally that request doesn't return any
    // result to not reveal if such mail exists in the database
    this.authService.askForEmailWithResetLink(email).subscribe();
    this.showSuccessMessage = true;
    this.navigateToMainPage();
  }

  navigateToMainPage(): void {
    setTimeout(() => {
      this.router.navigate(['topic-categories'])
    }, 5000);
  }
}
