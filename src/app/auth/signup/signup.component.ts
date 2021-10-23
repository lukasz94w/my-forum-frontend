import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token/token-storage.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  }

  isSuccessfulRegistration = false;
  isSignupFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const {username, email, password} = this.form;
    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessfulRegistration = true;
        this.navigateToLoginPage();
      },
      err => {
        this.errorMessage = err.error;
        this.isSignupFailed = true;
        // this.reloadPage();
      }
    )
  }

  navigateToLoginPage(): void {
    setTimeout(() => {
      this.router.navigate(['auth/signin'])
    }, 5000);
  }

  reloadPage(): void {
    setTimeout(() => {
      // this.router.navigate(['auth/signup']).then(page => window.location.reload());
      window.location.reload();
    }, 5000);
  }
}
