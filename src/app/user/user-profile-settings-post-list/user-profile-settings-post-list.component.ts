import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../token/token-storage.service";
import {UserService} from "../../service/user.service";
import {Post2} from "../../model/post2";

@Component({
  selector: 'app-user-profile-settings-post-list',
  templateUrl: './user-profile-settings-post-list.component.html',
  styleUrls: ['./user-profile-settings-post-list.component.css']
})
export class UserProfileSettingsPostListComponent implements OnInit {

  username: string = ''
  pageablePosts: Post2[] = [];
  postsLength = - 1;

  currentPage = 1;
  totalPosts = 0;
  totalPages = 0;
  numberOfPostsOnOnePage = 10;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    //to powinno byc przekazywane w linku...
    this.username = this.tokenStorageService.getUsername();
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
