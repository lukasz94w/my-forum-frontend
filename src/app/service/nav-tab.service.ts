import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavTabService {

  private navTabChangedSource = new Subject<string>();

  navTabChanged$ = this.navTabChangedSource.asObservable();

  changeTab(selectedNavTabName: string) {
    this.navTabChangedSource.next(selectedNavTabName);
  }

}
