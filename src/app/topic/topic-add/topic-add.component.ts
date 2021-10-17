import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Post} from "../../model/post";
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

  user: User;

  constructor(private topicService: TopicService, private router: Router) {
    this.user = new User("Janek", "Kowalski");
  }

  ngOnInit(): void {
  }

  addNewTopic(f: NgForm) {
    const value = f.value;
    const newTopic = new Topic(value.title, value.content, this.user);
    this.topicService.addNewTopic(newTopic);
    this.router.navigate(['topic']);
  }
}
