import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavTabEvent {

  private navTabChangedSource = new Subject<string>();

  navTabChanged$ = this.navTabChangedSource.asObservable();

  emitChangeTab(selectedNavTabName: string) {
    this.navTabChangedSource.next(selectedNavTabName);
  }
}
