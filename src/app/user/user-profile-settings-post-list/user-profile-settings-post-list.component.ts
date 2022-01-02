import {Component, Input, OnChanges} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Post2} from "../../model/response/post2";

@Component({
  selector: 'app-user-profile-settings-post-list',
  templateUrl: './user-profile-settings-post-list.component.html',
  styleUrls: ['./user-profile-settings-post-list.component.css']
})
export class UserProfileSettingsPostListComponent implements OnChanges {

  @Input() username = '';

  pageablePosts: Post2[] = [];
  postsLength = -1;

  currentPage = 1;
  totalPosts = 0;
  totalPages = 0;
  numberOfPostsOnOnePage = 10;

  constructor(private userService: UserService) {}

  //whenever the data in parent changes,
  //the child gets notified about this in
  //the ngOnChanges() method -> ngOnInit then is not needed!
  //-------------------------------------------------------
  //noticing child about new data
  //could also be solved by creating service
  //and subscribe for data changes in parent
  //then ngOnInit would be needed (there will be subscription)
  ngOnChanges(): void {
    this.currentPage = 1;
    this.findPageablePostsByUser();
  }

  findPageablePostsByUser(): void {
    const params = {'page': this.currentPage - 1, 'username': this.username}
    this.userService.findPageablePostsByUser(params).subscribe(
      (data: any) => {
        this.pageablePosts = data.pageablePosts
        this.postsLength = this.pageablePosts.length;
        this.totalPosts = data.totalPosts;
        this.totalPages = data.totalPages;
      },
      (error) =>
        console.log(error)
    );
  }

  handlePageChange($event: number) {
    this.currentPage = $event;
    this.findPageablePostsByUser();
  }
}
