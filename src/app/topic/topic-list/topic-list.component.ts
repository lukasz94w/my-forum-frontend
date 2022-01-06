import {Component, OnInit} from '@angular/core';
import {Topic} from "../../model/response/topic";
import {TopicService} from "../../service/topic.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {LastTopicActivity} from "../../model/response/last-topic-activity";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  pageableTopics: Topic[] = [];
  numberOfAnswersInPageableTopics: number[] = [];
  lastPageableTopicActivities: LastTopicActivity[] = [];
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
        this.findPageableTopicsInCategory();
      }
    )
  }

  findPageableTopicsInCategory(): void {
    const params = {'page': this.currentPage - 1, 'category': this.category}
    this.topicService.findPageableTopicsInCategory(params).subscribe(
      (data: any) => {
        this.pageableTopics = data.pageableTopics
        this.numberOfAnswersInPageableTopics = data.numberOfPostsInPageableTopics;
        this.lastPageableTopicActivities = data.lastPageableTopicActivities;
        this.topicsLength = this.pageableTopics.length;
        this.totalTopics = data.totalTopics;
        this.totalPages = data.totalPages;
      },
      (error) =>
        console.log(error)
    );
  }

  handlePageChange($event: number) {
    this.currentPage = $event;
    this.findPageableTopicsInCategory();
  }
}
