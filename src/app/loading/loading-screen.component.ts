import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingStatusEvent} from "../event/loading-status-event.service";
import {debounceTime, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-loading',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  showItSelf: boolean = false;

  componentDestroyedNotifier = new Subject();

  constructor(private loadingStatusEvent: LoadingStatusEvent) {
  }

  ngOnInit(): void {
    // debounce time to avoid showing loading screen when load last less than 50ms
    this.loadingStatusEvent.isLoadingActiveSource$
      .pipe(debounceTime(50), takeUntil(this.componentDestroyedNotifier))
      .subscribe((isLoadingActive) => {
        this.showItSelf = isLoadingActive;
      }
    );
  }

  ngOnDestroy(): void {
    this.componentDestroyedNotifier.next();
    this.componentDestroyedNotifier.complete();
  }
}
