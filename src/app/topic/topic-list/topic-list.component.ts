import {Component, OnInit} from '@angular/core';
import {Topic} from "../../model/topic";
import {TopicService} from "../../service/topic.service";
import {TokenStorageService} from "../../token/token-storage.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  topics: Topic[] = [];

  constructor(private topicService: TopicService, private tokenStorageService: TokenStorageService, private router: ActivatedRoute) {
  }

  ngOnInit() {

    console.log("Is logged in: " + this.tokenStorageService.isLoggedIn());

    this.router.params.subscribe(
      (params: Params) => {
        const categoryName = params['category'];
        console.log("Category name: " + categoryName);
        this.topicService.findAllTopicsByCategory(categoryName).subscribe(
          (topics: any[]) => {
            this.topics = topics;
          },
          (error) =>
            console.log(error)
        );
      }
    )
  }

}
