import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NewTopicContent} from "../../model/request/new-topic-content";
import {SignOutEvent} from "../../event/sign-out-event.service";

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit {

  form: any = {
    title: null, content: null
  }
  category: string = ''

  constructor(private topicService: TopicService, private router: Router,
              private activatedRoute: ActivatedRoute, private signOutEvent: SignOutEvent) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) =>
        this.category = params['category']
    )
    this.signOutEvent.signOutEvent$.subscribe(
      () => {
        this.router.navigate(['topic-categories']);
      }
    )
  }

  addNewTopic() {
    const {title, content} = this.form;
    const newTopic = new NewTopicContent(title, content, this.category);
    this.topicService.createNewTopic(newTopic).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        alert(error.error.message);
        this.router.navigate(['topic-categories']);
      }
    )
  }
}
