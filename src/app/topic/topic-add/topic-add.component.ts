import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NewTopicContent} from "../../model/request/new-topic-content";
import {SignOutService} from "../../service/event/sign-out.service";

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
              private activatedRoute: ActivatedRoute, private signOutService: SignOutService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) =>
        this.category = params['category']
    )
    this.signOutService.signOutEvent$.subscribe(
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
      () => {
        alert("Error occurred. Please try again later");
      }
    )
  }
}
