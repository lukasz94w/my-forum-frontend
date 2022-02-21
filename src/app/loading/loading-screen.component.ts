import {Component, OnInit} from '@angular/core';
import {LoadingStatusEvent} from "../event/loading-status-event.service";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-loading',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  showItSelf: boolean = false;

  constructor(private loadingStatusEvent: LoadingStatusEvent) {
  }

  ngOnInit(): void {
    this.loadingStatusEvent.isLoadingActiveSource$
      .pipe(debounceTime(1) // avoid showing loading screen when load last less than 100ms
      ).subscribe(
      (isLoadingActive) => {
        this.showItSelf = isLoadingActive;
      }
    );
  }
}
