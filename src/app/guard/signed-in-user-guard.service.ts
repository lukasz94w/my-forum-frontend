import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from "../service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SignedInUserGuard implements CanActivate {

  constructor(private router: Router, private localStorageService: LocalStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.localStorageService.isLoggedIn()) {
      this.router.navigate(['topic-categories']);
      return false;
    }
    return true;
  }
}
