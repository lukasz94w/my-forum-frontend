import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../service/post.service";
import {Post2} from "../../model/response/post2";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  pageablePosts: Post2[] = [];
  postsLength: number = -1;
  currentPage: number = 1;
  totalPosts: number = 0;
  totalPages: number = 0;
  numberOfPostsOnOnePage: number = 10;

  searchQueryValue: string = '';

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (queryParam) => {
        if (queryParam.query != undefined) {
          this.searchQueryValue = queryParam.query;
          this.searchPageablePosts();
        } else {
          // redirect to page not found component
        }
      }
    )
  }

  private searchPageablePosts() {
    const params = {'page': this.currentPage - 1, 'query': this.searchQueryValue}
    this.postService.searchInPosts(params).subscribe(
      (data: any) => {
        this.pageablePosts = data.pageablePosts
        this.postsLength = this.pageablePosts.length;
        this.totalPosts = data.totalPosts;
        this.totalPages = data.totalPages;
      });
  }

  handlePageChange($event: number) {
    this.currentPage = $event;
    this.searchPageablePosts();
  }
}