import {Component, OnDestroy, OnInit} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NewTopicContent} from "../../model/request/new-topic-content";
import {SignOutEvent} from "../../event/sign-out-event.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit, OnDestroy {

  form: any = {
    title: null, content: null
  }
  category: string = ''

  componentDestroyedNotifier = new Subject();

  constructor(private topicService: TopicService, private router: Router,
              private activatedRoute: ActivatedRoute, private signOutEvent: SignOutEvent) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) =>
        this.category = params['category']
    )
    this.signOutEvent.signOutEvent$
      .pipe(takeUntil(this.componentDestroyedNotifier))
      .subscribe(
      () => {
        this.router.navigate(['topic-categories']);
      }
    )
  }

  addNewTopic() {
    const {title, content} = this.form;
    this.topicService.createNewTopic(new NewTopicContent(title, content, this.category)).subscribe(
      (id: number) => {
        this.router.navigate(['/topic/' + id]);
      },
      (error) => {
        alert(error.error.message);
        this.router.navigate(['topic-categories']);
      }
    )
  }

  ngOnDestroy(): void {
    this.componentDestroyedNotifier.next();
    this.componentDestroyedNotifier.complete();
  }
}
