import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-template-not-found',
  template: `
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <div class="content">
      <i class="fa fa-warning"></i>
      <h1>{{ errorCode }}</h1>
      <p class="paragraph">{{ errorMessage }}</p>
      <a class="back" routerLink="/topic-categories">Home</a>
    </div>`,
  styles:
    [`
      h1 {
        text-align: center;
        font-size: 190px;
        font-weight: 400;
        margin: 0;
      }

      .fa {
        font-size: 120px;
        text-align: center;
        display: block;
        padding-top: 100px;
        margin: 0 auto;
        color: #2e8d5c;
      }

      .paragraph {
        text-align: center;
        font-size: 36px;
        color: #4A235A;
      }

      a.back {
        text-align: center;
        display: block;
        text-decoration: none;
        font-size: 24px;
        background: #2e8d5c;
        border-radius: 10px;
        width: 10%;
        padding: 4px;
        color: #fff;
        margin: 0 auto 30px;
      }

      @media (max-width: 992px) {
        a.back {
          width: 100px;
        }
      }

      @media (max-width: 425px) {
        h1 {
          padding-top: 20px;
        }

        .fa {
          padding-top: 100px;
        }
      }
    `]
})
export class TemplateNotFoundComponent {
  @Input() errorCode?: number;
  @Input() errorMessage?: string;
}
