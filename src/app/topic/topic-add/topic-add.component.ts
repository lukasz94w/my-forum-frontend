import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {Router} from "@angular/router";
import {TopicContent} from "../../model/topic-content";

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit {

  form: any = {
    title: null, content: null
  }

  constructor(private topicService: TopicService, private router: Router) {
  }

  ngOnInit(): void {
  }

  addNewTopic() {
    const {title, content} = this.form;
    const newTopic = new TopicContent(title, content);
    this.topicService.createNewTopic(newTopic);
    this.router.navigate(['/']);
  }
}
