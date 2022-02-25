import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {LocalStorageService} from "../../service/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  topicsLength?: number;

  currentPage: number = 1;
  totalTopics: number = 0;
  totalPages: number = 0;
  numberOfTopicsOnOnePage: number = 10;

  isUserWithoutBanLoggedIn: boolean = false;

  searchModeActive: boolean = false;

  headerText = '';
  category: string = '';
  searchQueryValue: string = '';

  constructor(private topicService: TopicService, private localStorageService: LocalStorageService,
              private activatedRoute: ActivatedRoute, private signOutEvent: SignOutEvent,
              private router: Router) {
  }

  ngOnInit() {
    this.isUserWithoutBanLoggedIn = this.localStorageService.isUserWithoutBanLoggedIn();

    combineLatest([this.activatedRoute.params, this.activatedRoute.queryParams])
      .pipe(map(results => ({param: results[0].category, query: results[1].query})), debounceTime(0))
      .subscribe(results => {
        if (results.param === 'search' && results.query !== undefined ) {
          this.searchQueryValue = results.query;
          this.searchInTopicTitles(1);
        } else if (results.param !== 'search') {
          this.category = results.param;
          this.findPageableTopicsInCategory(1)
        } else {
          this.router.navigate(['page-not-found']);
        }
      });

    this.signOutEvent.signOutEvent$.subscribe(
      () => {
        this.isUserWithoutBanLoggedIn = false;
      });
  }

  findPageableTopicsInCategory(page: number): void {
    const params = {'page': page - 1, 'category': this.category}
    this.topicService.findPageableTopicsInCategory(params).subscribe(
      (data: any) => {
        this.headerText = 'Latest topics in ' + this.category + ':';
        this.currentPage = page;
        this.searchModeActive = false;
        this.buildData(data);
      },
      (error) => {
        this.router.navigate(['forum-item-not-found'], {
          state: {
            errorCode: error.status,
            errorMessage: error.error.message
          }
        });
      }
    );
  }

  searchInTopicTitles(page: number) {
    const params = {'page': page - 1, 'query': this.searchQueryValue}
    this.topicService.searchInTopicTitles(params).subscribe(
      (data: any) => {
        this.headerText = 'Found results for "' + this.searchQueryValue + '":';
        this.currentPage = page;
        this.searchModeActive = true;
        this.buildData(data);
      },
      (error) =>
        console.log(error)
    );
  }

  handlePageChange($event: number) {
    this.searchModeActive ? this.searchInTopicTitles($event) : this.findPageableTopicsInCategory($event);
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
