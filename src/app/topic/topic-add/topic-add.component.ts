import {Component, OnInit} from '@angular/core';
import {Topic} from "../../model/topic";
import {TopicService} from "../../service/topic.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit {
  form: any = {
    title: null, content: null
  }

  user: User;

  constructor(private topicService: TopicService, private router: Router) {
    this.user = new User("admin", "admin");
  }

  ngOnInit(): void {
  }

  addNewTopic() {
    const {title, content} = this.form;
    const newTopic = new Topic(title, content, this.user);
    this.topicService.addNewTopic(newTopic);
    this.router.navigate(['topic']);
  }
}
