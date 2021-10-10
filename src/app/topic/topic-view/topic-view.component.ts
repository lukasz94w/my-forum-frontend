import { Component, OnInit } from '@angular/core';
import {Topic} from "../../model/topic";
import {TopicService} from "../../service/topic.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})
export class TopicViewComponent implements OnInit {

  topic = {} as Topic;
  id: number | undefined;

  constructor(private topicService: TopicService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.topicService.getTopicById(this.id)
          .subscribe(
            (data: Topic) => {
              this.topic = data;
              console.log(this.topic);
            },
            (error) => console.log(error)
          );
      }
    );
  }
}
