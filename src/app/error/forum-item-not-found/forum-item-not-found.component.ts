import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-forum-item-not-found',
  template: `
    <app-template-not-found [errorCode]="errorCode" [errorMessage]="errorMessage"></app-template-not-found>`,
  styles: [``]
})
export class ForumItemNotFoundComponent implements OnInit {

  errorCode?: number;
  errorMessage?: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // if user refresh page after error redirect or enter '/forum-item-not-found url' directly into the browser
    if (history.state.errorCode === undefined || history.state.errorMessage === undefined) {
      this.router.navigate(['topic-categories'])
    }
    this.errorCode = history.state.errorCode;
    this.errorMessage = history.state.errorMessage;
  }
}
