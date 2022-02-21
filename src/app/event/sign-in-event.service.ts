import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignInEvent {

  private signInEventSource = new Subject<void>();

  signInEvent$ = this.signInEventSource.asObservable();

  emitSignIn() {
    this.signInEventSource.next();
  }
}
