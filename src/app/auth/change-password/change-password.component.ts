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
  showChangingFinishedSuccessful: boolean = false;
  showChangingFinishedUnsuccessful: boolean = false;
  showWhyChangingFinishedUnsuccessfully: string = '';

  form: any = {
    newPasswordFirstTry: null,
    newPasswordSecondTry: null
  }
  doesPasswordsMatch: boolean = true;

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
      this.authService.changePassword(changedPasswordWithToken).subscribe(
        (response: any) => {
          alert(response.message)
        },
        (error) => {
          alert(error.error.message)
        }
      )
      this.navigateToLoginPage();
    } else {
      this.doesPasswordsMatch = false;
    }
  }

  navigateToLoginPage(): void {
    setTimeout(() => {
      this.router.navigate(['auth/signin'])
    }, 5000);
  }
}
