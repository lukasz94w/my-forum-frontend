import {Component, Input, OnChanges} from '@angular/core';
import {LastTopicActivity} from "../../model/response/last-topic-activity";
import {UserService} from "../../service/user.service";
import {Topic2} from "../../model/response/topic2";

@Component({
  selector: 'app-user-profile-settings-topic-list',
  templateUrl: './user-profile-settings-topic-list.component.html',
  styleUrls: ['./user-profile-settings-topic-list.component.css']
})
export class UserProfileSettingsTopicListComponent implements OnChanges {

  @Input() username = '';

  pageableTopics: Topic2[] = [];
  numberOfAnswersInPageableTopics: number[] = [];
  lastPageableTopicActivities: LastTopicActivity[] = [];
  topicsLength = -1;

  currentPage = 1;
  totalTopics = 0;
  totalPages = 0;
  numberOfTopicsOnOnePage = 10;

  constructor(private userService: UserService) {
  }

  // called whenever the input changes (int this class username),
  ngOnChanges(): void {
    this.currentPage = 1;
    this.findPageableTopicsByUser();
  }

  findPageableTopicsByUser(): void {
    const params = {'page': this.currentPage - 1, 'username': this.username}
    this.userService.findPageableTopicsByUser(params).subscribe(
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
    this.findPageableTopicsByUser();
  }
}

