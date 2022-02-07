import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {LocalStorageService} from "../../service/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {LastTopicActivity} from "../../model/response/last-topic-activity";
import {SignOutEvent} from "../../event/sign-out-event.service";
import {Topic2} from "../../model/response/topic2";
import {combineLatest} from "rxjs";
import {debounceTime, map} from "rxjs/operators";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  pageableTopics: Topic2[] = [];
  numberOfAnswersInPageableTopics: number[] = [];
  lastPageableTopicActivities: LastTopicActivity[] = [];
  topicsLength: number = -1;
  category: string = '';

  currentPage: number = 1;
  totalTopics: number = 0;
  totalPages: number = 0;
  numberOfTopicsOnOnePage: number = 10;

  isUserWithoutBanLoggedIn: boolean = false;

  isSearchMode: boolean = false;
  searchQueryValue: string = '';

  constructor(private topicService: TopicService, private localStorageService: LocalStorageService,
              private activatedRoute: ActivatedRoute, private signOutEvent: SignOutEvent) {
  }

  ngOnInit() {
    this.isUserWithoutBanLoggedIn = this.localStorageService.isUserWithoutBanLoggedIn();

    combineLatest([this.activatedRoute.params, this.activatedRoute.queryParams])
      .pipe(map(results => ({param: results[0].param, query: results[1].query})), debounceTime(0))
      .subscribe(results => {
          this.currentPage = 1;
          if (results.param !== 'search') {
            this.isSearchMode = false;
            this.category = results.param
            this.findPageableTopicsInCategory()
          } else {
            this.isSearchMode = true;
            this.searchQueryValue = results.query
            this.searchInTopicTitles();
          }
        });

    this.signOutEvent.signOutEvent$.subscribe(
      () => {
        this.isUserWithoutBanLoggedIn = false;
      });
  }

  findPageableTopicsInCategory(): void {
    const params = {'page': this.currentPage - 1, 'category': this.category}
    this.topicService.findPageableTopicsInCategory(params).subscribe(
      (data: any) => {
        this.buildData(data);
      },
      (error) =>
        console.log(error)
    );
  }

  searchInTopicTitles() {
    const params = {'page': this.currentPage - 1, 'query': this.searchQueryValue}
    this.topicService.searchInTopicTitles(params).subscribe(
      (data: any) => {
        this.buildData(data);
      },
      (error) =>
        console.log(error)
    );
  }

  handlePageChange($event: number) {
    this.currentPage = $event;
    if (this.isSearchMode) {
      this.searchInTopicTitles();
    } else {
      this.findPageableTopicsInCategory();
    }
  }

  private buildData(data: any) {
    this.pageableTopics = data.pageableTopics
    this.numberOfAnswersInPageableTopics = data.numberOfPostsInPageableTopics;
    this.lastPageableTopicActivities = data.lastPageableTopicActivities;
    this.topicsLength = this.pageableTopics.length;
    this.totalTopics = data.totalTopics;
    this.totalPages = data.totalPages;
  }
}
