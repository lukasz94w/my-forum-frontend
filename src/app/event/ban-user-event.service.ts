import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BanUserEvent {

  private userWasBannedSource = new Subject<string>();

  userWasBannedSource$ = this.userWasBannedSource.asObservable();

  emitUserWasBanned(sourceOfEmit: string) {
    this.userWasBannedSource.next(sourceOfEmit);
  }
}
