import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Post2} from "../../model/response/post2";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-user-profile-settings-post-list',
  templateUrl: './user-profile-settings-post-list.component.html',
  styleUrls: ['./user-profile-settings-post-list.component.css']
})
export class UserProfileSettingsPostListComponent implements OnChanges {

  @Input() userName = '';
  @Input() activeTabName = '';

  pageablePosts: Post2[] = [];
  postsLength?: number;

  currentPage = 1;
  totalPosts = 0;
  totalPages = 0;
  numberOfPostsOnOnePage = environment.pageableItemsNumber;

  constructor(private userService: UserService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // detect if username of viewed user changed, if so clear loaded posts to force reload in next if
    if (changes.userName) {
      if ((!changes.userName.firstChange) && changes.userName.previousValue != changes.userName.currentValue) {
        this.postsLength = undefined;
        this.pageablePosts = [];
      }
    }
    // detect if posts tab have been chosen
    if (changes.activeTabName) {
      if (changes.activeTabName.currentValue === 'posts' && this.postsLength === undefined) {
        this.findPageablePostsByUser(1);
      }
    }
  }

  findPageablePostsByUser(page: number): void {
    const params = {'page': page - 1, 'username': this.userName}
    this.userService.findPageablePostsByUser(params).subscribe(
      (data: any) => {
        this.pageablePosts = data.pageablePosts
        this.postsLength = this.pageablePosts.length;
        this.totalPosts = data.totalPosts;
        this.totalPages = data.totalPages;
        this.currentPage = page;
      },
      (error) =>
        console.log(error)
    );
  }

  handlePageChange($event: number) {
    this.findPageablePostsByUser($event);
  }
}
