import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token/token-storage.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: any = {
    username: null, password: null
  }

  isLoginFailed = false;

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const {username, password} = this.form;
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.navigateToTopicsList();
      },
      err => {
        this.isLoginFailed = true;
        this.reloadPage();
      }
    )
    return false;
  }

  navigateToTopicsList(): void {
    setTimeout(() => {
        this.router.navigate(['topic-list'])
      }, 1000
    )
  }

  reloadPage(): void {
    setTimeout(() => {
        window.location.reload();
      }, 2000
    )
  }
}
