import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {ChangePasswordViaEmailLink} from "../../model/request/change-password-via-email-link";
import {HttpStatusCode} from "@angular/common/http";

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
  showResetExpiredLink: boolean = false;

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
      this.doesPasswordsMatch = true;
      this.authService.changePassword(new ChangePasswordViaEmailLink(this.form.newPasswordFirstTry, this.receivedToken)).subscribe(
        (response) => {
          alert(response.message)
          this.navigateToLoginPage();
        },
        (error) => {
          // when link (token) is expired
          if (error.status === HttpStatusCode.Gone) {
            this.showResetExpiredLink = true;
          }
          alert(error.error.message)
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
