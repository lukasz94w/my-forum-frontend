import {
  AfterViewChecked,
  Component,
  OnInit
} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../../service/post.service";
import {Post} from "../../model/response/post";
import {ViewportScroller} from "@angular/common";
import {Topic3} from "../../model/response/topic3";
import {LocalStorageService} from "../../service/local-storage.service";
import {SignOutEvent} from "../../event/sign-out-event.service";
import {PostStatus} from "../../model/request/post-status";

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})
export class TopicViewComponent implements OnInit, AfterViewChecked {

  topicId: number = 0;
  topic = {} as Topic3;
  pageablePosts: Post[] = [];

  pageNumber: number = 1;
  private postNumber: number = 0;
  private doScroll = false;

  totalPosts: number = 0;
  totalPages: number = 0;
  numberOfPostsOnOnePage: number = 10;

  showAdminButtons: boolean = false;

  constructor(private topicService: TopicService, private postService: PostService,
              private activatedRoute: ActivatedRoute, private router: Router,
              private viewPortScroller: ViewportScroller, private localStorageService: LocalStorageService,
              private signOutEvent: SignOutEvent) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.topicId = +params['id'];
      });

    this.activatedRoute.queryParams.subscribe(
      params => {
        if (params.number) {
          this.postNumber = params.number;
          if (params.number > 10) {
            // this functions can use async/await (or promise)
            // and then result of them can be passed
            // to findTopicById and findPageable..
            this.recalculatePageNumber();
            this.recalculatePostNumber();
          }
        }
      }
    )
    this.findTopicById();
    this.findPageablePostsOnPage();

    this.showAdminButtons = this.localStorageService.isUserAdmin();
    this.signOutEvent.signOutEvent$.subscribe(
      () => {
        this.showAdminButtons = false;
      }
    )
  }

  private recalculatePageNumber(): void {
    this.postNumber % this.numberOfPostsOnOnePage === 0 ?
      this.pageNumber = this.postNumber / this.numberOfPostsOnOnePage :
      this.pageNumber = Math.ceil(this.postNumber / this.numberOfPostsOnOnePage);
  }

  private recalculatePostNumber() {
    const result = this.postNumber % this.numberOfPostsOnOnePage;
    result === 0 ?
      this.postNumber = 10 :
      this.postNumber = result;
  }

  findTopicById(): void {
    this.topicService.getTopicById(this.topicId)
      .subscribe(
        (data: Topic3) => {
          this.topic = data;
        },
        (error) => console.log(error)
      );
  }

  findPageablePostsOnPage(): void {
    const params = {'page': this.pageNumber - 1, 'id': this.topicId}
    this.postService.findPageablePostsByTopicId(params).subscribe(
      (data: any) => {
        this.pageablePosts = data.pageablePosts;
        this.totalPosts = data.totalPosts;
        this.totalPages = data.totalPages;

        if (this.pageablePosts.length > 0) {
          setTimeout(() => {
            this.doScroll = true;
          }, 75)
        }
        // without this timeout when we first time open the page scroll
        // it doesn't work correctly (doesn't scroll to chosen anchor)
        // probably its a bug in Angular
      },
      () => {
        alert("Error occurred. You will be navigated to main page")
        this.router.navigate(['topic-categories'])
      }
    );
  }

  handlePageChange($event: number) {
    this.pageNumber = $event;
    this.findPageablePostsOnPage();
  }

  ngAfterViewChecked(): void {
    if (this.doScroll && this.postNumber !== -1) {
      this.viewPortScroller.scrollToAnchor(String(this.postNumber));
      this.postNumber = -1;
      this.doScroll = false;
    }
  }

  // didn't make separate admin component (with button)
  // because then there must be created 10 components (for each post)
  changePostStatus(postId: number, moderatedStatus: boolean) {
    this.postService.changeTopicStatus(new PostStatus(postId, moderatedStatus)).subscribe(
      () => {
        this.findPageablePostsOnPage();
      },
      () => {
        alert("Error occurred. Try again later")
      }
    )
  }
}
