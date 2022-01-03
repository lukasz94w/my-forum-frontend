import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
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
        this.errorMessage = err.message;
        this.isSignupFailed = true;
        // this.reloadPage();
      }
    )
  }

  navigateToLoginPage(): void {
    setTimeout(() => {
      this.router.navigate(['auth/sign-in'])
    }, 5000);
  }

  reloadPage(): void {
    setTimeout(() => {
      // this.router.navigate(['auth/sign-up']).then(page => window.location.reload());
      window.location.reload();
    }, 5000);
  }
}
