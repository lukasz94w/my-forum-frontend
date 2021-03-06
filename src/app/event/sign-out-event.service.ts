import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignOutEvent {

  private signOutEventSource = new Subject<void>();

  signOutEvent$ = this.signOutEventSource.asObservable();

  emitSignOut() {
    this.signOutEventSource.next();
  }
}
