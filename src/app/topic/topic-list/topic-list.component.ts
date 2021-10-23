import { Component, OnInit } from '@angular/core';
import {Topic} from "../../model/topic";
import {TopicService} from "../../service/topic.service";
import {TokenStorageService} from "../../token/token-storage.service";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  topics: Topic[] = [];

  constructor(private topicService: TopicService, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {

    console.log("Is logged in: " + this.tokenStorageService.isLoggedIn());

    return this.topicService.getTopics()
      .subscribe(
        (posts: any[]) => {
          this.topics = posts;
        },
        (error) => console.log(error)
      );
  }

}
