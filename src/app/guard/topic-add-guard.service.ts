import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from "../service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TopicAddGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // only not banned user have access to topic add page
    if (!this.localStorageService.isUserWithoutBanLoggedIn()) {
      this.router.navigate(['auth/sign-in']);
      return false;
    }
    return true;
  }
}
