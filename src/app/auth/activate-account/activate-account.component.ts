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
  activationStatus: string = '';
  resendTokenStatus: string = '';

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.activationToken = params.token;
      });

    const params = {'activationToken': this.activationToken};
    this.authService.activateAccount(params).subscribe(
      () => {
        this.activationStatus = 'accountActivated';
        this.navigateToLoginPage();
      },
      (error) => {
        switch (error.status) {
          case HttpStatusCode.Conflict: {
            this.activationStatus = 'alreadyActivated';
            break;
          }
          case HttpStatusCode.Forbidden: {
            this.activationStatus = 'tokenNotFound';
            break;
          }
          case HttpStatusCode.Gone: {
            this.activationStatus = 'tokenExpired';
            break;
          }
        }
      }
    );
  }

  resendToken(): void {
    this.activationStatus = '';
    const params = {'oldExpiredToken': this.activationToken};
    this.resendTokenStatus = 'pending'

    this.authService.resendActivationToken(params).subscribe(
      () => {
        this.resendTokenStatus = 'newMailWasSent'
      },
      (error) => {
        switch (error.status) {
          case HttpStatusCode.Forbidden: {
            this.resendTokenStatus = 'oldTokenDoesntExist';
            break;
          }
          case HttpStatusCode.BadGateway: {
            this.resendTokenStatus = 'failedToSendEmail';
            break;
          }
        }
      }
    );
  }

  navigateToLoginPage(): void {
    setTimeout(() => {
      this.router.navigate(['auth/sign-in'])
    }, 2500);
  }
}
