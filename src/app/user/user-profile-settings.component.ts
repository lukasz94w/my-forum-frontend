import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {TokenStorageService} from "../token/token-storage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {User} from "../model/user";

@Component({
  selector: 'app-user-profile-test',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})
export class UserProfileSettingsComponent implements OnInit {

  usernameFromUrl: string = ''
  usernameFromLocalStorage: string = ''
  user = {} as User;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(
      (params: Params) => {
        this.usernameFromUrl = params['username'];
      });

    this.usernameFromLocalStorage = this.tokenStorageService.getUsername();

    this.userService.getUserInfo(this.usernameFromUrl).subscribe(
      (data: User) => {
        this.user = data;
      })

    //tu bede porownywal czy oba username'y sa rowne, jezeli tak to jakos wtedy trzeba odblokowac widok ustawien
  }

}
