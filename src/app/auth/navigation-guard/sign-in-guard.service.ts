import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from "../../service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SignInGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.localStorageService.isLoggedIn()) {
      this.router.navigate(['auth/sign-in']);
      return false;
    }
    return true;
  }
}
