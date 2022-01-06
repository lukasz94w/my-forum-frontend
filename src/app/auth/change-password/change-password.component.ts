import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {ChangePasswordThroughEmail} from "../../model/request/change-password-through-email";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  receivedToken: string = '';

  form: any = {
    newPasswordFirstTry: null,
    newPasswordSecondTry: null
  }
  doesPasswordsMatch: boolean = true;
  showResetExpiredTokenButton: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.receivedToken = params.token;
      });
  }

  changePassword() {
    if (this.form.newPasswordFirstTry === this.form.newPasswordSecondTry) {
      const changedPasswordWithToken = new ChangePasswordThroughEmail(
        this.form.newPasswordFirstTry, this.receivedToken
      );
      this.doesPasswordsMatch = true;
      this.authService.changePassword(changedPasswordWithToken).subscribe(
        (response) => {
          alert(response.message)
          this.navigateToLoginPage();
        },
        (error) => {
          const errorMessage = error.error.message
          // it could also be done reading HttpStatus as in ActivateAccountComponent was done
          // here I read message instead
          if (errorMessage == 'Token is expired') {
            this.showResetExpiredTokenButton = true;
          }
          alert(errorMessage)
        }
      )
    } else {
      this.doesPasswordsMatch = false;
    }
  }

  navigateToLoginPage(): void {
    setTimeout(() => {
      this.router.navigate(['auth/sign-in'])
    }, 1000);
  }
}
