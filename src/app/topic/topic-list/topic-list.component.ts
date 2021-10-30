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
  topicsLength = -1;
  category = '';

  currentPage = 1;
  totalTopics = 0;
  totalPages = 0;
  numberOfTopicsOnOnePage = 10;

  constructor(private topicService: TopicService, public tokenStorageService: TokenStorageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe(
      (param: Params) => {
        this.category = param['category'];
        this.findAllTopicsByCategory();
      }
    )
  }

  findAllTopicsByCategory(): void {
    const params = {'page' : this.currentPage - 1, 'category': this.category}
    this.topicService.findAllTopicsByCategory(params).subscribe(
      (data: any) => {
        this.topics = data.topics
        this.topicsLength = this.topics.length
        this.totalTopics = data.totalTopics
        this.totalPages = data.totalPages
        console.log(data)
      },
      (error) =>
        console.log(error)
    );
  }

  handlePageChange($event: number) {
    this.currentPage = $event;
    this.findAllTopicsByCategory();
  }
}
