import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../service/token-storage.service";

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(public tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isLoggedIn();

    //tu jakos powinno byc inaczej i nie powinno to byc kazdorazowo ustawiane tylko brac info czy zalogowany z
    //token storage is loggedin bezposrednio
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
