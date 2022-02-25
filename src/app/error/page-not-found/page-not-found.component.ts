import {Component} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <app-template-not-found [errorCode]=401 [errorMessage]="'Page not found'"></app-template-not-found>`,
  styles: [``]
})
export class PageNotFoundComponent {
}
