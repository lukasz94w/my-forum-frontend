import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  activationToken: string = '';

  showActivationSuccessfulMessage: boolean = false
  showActivationErrorMessage: boolean = false;
  activationMessage: string = '';
  showResetActivationTokenButton: boolean = false;

  showPendingStatus: boolean = false;
  showResendSuccessfulMessage: boolean = false;
  showResendErrorMessage: boolean = false;
  resendMessage: string = '';

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.activationToken = params.token;
      });

    const params = {'activationToken': this.activationToken};
    this.authService.activateAccount(params).subscribe(
      (response) => {
        this.showActivationSuccessfulMessage = true;
        this.activationMessage = response.message;
        this.navigateToLoginPage();
      },
      (error) => {
        this.showActivationErrorMessage = true;
        this.activationMessage = error.error.message;
        // when activation link (token) is expired, show possibility of asking for new one
        if (error.status === HttpStatusCode.Gone) {
          this.showResetActivationTokenButton = true;
        }
      }
    );
  }

  resendToken(): void {
    const params = {'oldExpiredToken': this.activationToken};
    this.showActivationErrorMessage = false;
    this.showPendingStatus = true;

    this.authService.resendActivationToken(params).subscribe(
      (response) => {
        this.showResendSuccessfulMessage = true;
        this.resendMessage = response.message;
        this.showPendingStatus = false;
      },
      (error) => {
        this.showResendErrorMessage = true;
        this.resendMessage = error.error.message;
        this.showPendingStatus = false;
      }
    );
  }

  navigateToLoginPage(): void {
    setTimeout(() => {
      this.router.navigate(['auth/sign-in'])
    }, 2500);
  }
}
