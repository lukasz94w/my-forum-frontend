import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../token/token-storage.service";

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(public tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isLoggedIn();
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
