import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {Summary} from "../../model/summary";

@Component({
  selector: 'app-topic-categories',
  templateUrl: './topic-categories.component.html',
  styleUrls: ['./topic-categories.component.css']
})
export class TopicCategoriesComponent implements OnInit {

  summary = {} as Summary;

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.topicService.countTopicsAndPostsByCategory().subscribe(
      (data) => {
        this.summary = data;
      },
      (error) => {
        console.log(error);
      })
  }

}
