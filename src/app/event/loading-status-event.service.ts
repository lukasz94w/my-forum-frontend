import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingStatusEvent {

  private isLoadingActiveSource = new Subject<boolean>();

  isLoadingActiveSource$ = this.isLoadingActiveSource.asObservable();

  emitIsLoadingActive(isActive: boolean) {
    this.isLoadingActiveSource.next(isActive)
  }
}
