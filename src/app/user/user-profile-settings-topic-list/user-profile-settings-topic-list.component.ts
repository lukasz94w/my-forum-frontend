import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LastTopicActivity} from "../../model/response/last-topic-activity";
import {UserService} from "../../service/user.service";
import {Topic2} from "../../model/response/topic2";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-user-profile-settings-topic-list',
  templateUrl: './user-profile-settings-topic-list.component.html',
  styleUrls: ['./user-profile-settings-topic-list.component.css']
})
export class UserProfileSettingsTopicListComponent implements OnChanges {

  @Input() userName = '';
  @Input() activeTabName = '';

  pageableTopics: Topic2[] = [];
  numberOfAnswersInPageableTopics: number[] = [];
  lastPageableTopicActivities: LastTopicActivity[] = [];
  topicsLength?: number;

  currentPage = 1;
  totalTopics = 0;
  totalPages = 0;
  numberOfTopicsOnOnePage = environment.pageableItemsNumber;

  constructor(private userService: UserService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // detect if username of viewed user changed, if so clear loaded topics to force reload in next if
    if (changes.userName) {
      if ((!changes.userName.firstChange) && changes.userName.previousValue != changes.userName.currentValue) {
        this.topicsLength = undefined;
        this.pageableTopics = [];
      }
    }
    // detect if topics tab have been chosen
    if (changes.activeTabName) {
      if (changes.activeTabName.currentValue === 'topics' && this.topicsLength === undefined) {
        this.findPageableTopicsByUser(1);
      }
    }
  }

  findPageableTopicsByUser(page: number): void {
    const params = {'page': page - 1, 'username': this.userName}
    this.userService.findPageableTopicsByUser(params).subscribe(
      (data: any) => {
        this.pageableTopics = data.pageableTopics
        this.numberOfAnswersInPageableTopics = data.numberOfPostsInPageableTopics;
        this.lastPageableTopicActivities = data.lastPageableTopicActivities;
        this.topicsLength = this.pageableTopics.length;
        this.totalTopics = data.totalTopics;
        this.totalPages = data.totalPages;
        this.currentPage = page;
      },
      (error) =>
        console.log(error)
    );
  }

  handlePageChange($event: number) {
    this.findPageableTopicsByUser($event);
  }
}

