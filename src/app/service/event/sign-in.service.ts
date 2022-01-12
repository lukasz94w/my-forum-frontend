import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private signInEventSource = new Subject<string>();

  signInEvent$ = this.signInEventSource.asObservable();

  emitSignIn() {
    this.signInEventSource.next();
  }
}
