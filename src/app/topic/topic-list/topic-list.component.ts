import {Component, OnInit} from '@angular/core';
import {Topic} from "../../model/response/topic";
import {TopicService} from "../../service/topic.service";
import {LocalStorageService} from "../../service/local-storage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {LastTopicActivity} from "../../model/response/last-topic-activity";
import {SignOutService} from "../../service/event/sign-out.service";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  pageableTopics: Topic[] = [];
  numberOfAnswersInPageableTopics: number[] = [];
  lastPageableTopicActivities: LastTopicActivity[] = [];
  topicsLength: number = -1;
  category: string = '';

  currentPage: number = 1;
  totalTopics: number = 0;
  totalPages: number = 0;
  numberOfTopicsOnOnePage: number = 10;

  isLoggedIn: boolean = false;

  constructor(private topicService: TopicService, private tokenStorageService:
    LocalStorageService, private router: ActivatedRoute, private signOutService: SignOutService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.tokenStorageService.isLoggedIn();

    this.router.params.subscribe(
      (param: Params) => {
        this.category = param['category'];
        this.findPageableTopicsInCategory();
      }
    )
    this.signOutService.signOutEvent$.subscribe(
      () => {
        this.isLoggedIn = false;
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
