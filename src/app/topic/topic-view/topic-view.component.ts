import {
  AfterViewChecked,
  Component, OnDestroy,
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
import {HttpErrorResponse} from "@angular/common/http";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})
export class TopicViewComponent implements OnInit, AfterViewChecked, OnDestroy {

  topicId: number = 0;
  topic = {} as Topic3;
  pageablePosts: Post[] = [];

  pageNumber: number = 1;
  private postNumber: number = 0;
  private doScroll = false;

  totalPosts: number = 0;
  totalPages: number = 0;
  numberOfPostsOnOnePage: number = environment.pageableItemsNumber;

  showAdminButtons: boolean = false;

  componentDestroyedNotifier = new Subject();

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
          if (params.number > this.numberOfPostsOnOnePage) {
            this.recalculatePageNumber();
            this.recalculatePostNumber();
          }
        }
      }
    )
    this.findTopicById();
    this.findPageablePostsOnPage(this.pageNumber);

    this.showAdminButtons = this.localStorageService.isUserAdmin();
    this.signOutEvent.signOutEvent$
      .pipe(takeUntil(this.componentDestroyedNotifier))
      .subscribe(
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
      this.postNumber = this.numberOfPostsOnOnePage :
      this.postNumber = result;
  }

  findTopicById(): void {
    this.topicService.getTopicById(this.topicId)
      .subscribe(
        (data: Topic3) => {
          this.topic = data;
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  findPageablePostsOnPage(page: number): void {
    const params = {'page': page - 1, 'id': this.topicId}
    this.postService.findPageablePostsByTopicId(params).subscribe(
      (data: any) => {
        this.pageablePosts = data.pageablePosts;
        this.totalPosts = data.totalPosts;
        this.totalPages = data.totalPages;
        this.pageNumber = page;
        if (this.pageablePosts.length > 0) {
          setTimeout(() => {
            this.doScroll = true;
          }, 75)
        }
        // without this 75ms timeout when we first time open the page scroll
        // it doesn't work correctly (doesn't scroll to chosen anchor)
        // probably its a bug in Angular
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handlePageChange($event: number) {
    this.findPageablePostsOnPage($event);
  }

  ngAfterViewChecked(): void {
    if (this.doScroll && this.postNumber !== -1) {
      this.viewPortScroller.scrollToAnchor(String(this.postNumber));
      this.postNumber = -1;
      this.doScroll = false;
    }
  }

  handleError(error: HttpErrorResponse) {
    this.router.navigate(['forum-item-not-found'], {
      state: {
        errorCode: error.status,
        errorMessage: error.error.message
      }
    });
  }

  // didn't make separate admin component (with button)
  // because then there must be created 10 components (for each post)
  changePostStatus(postId: number, moderatedStatus: boolean) {
    this.postService.changePostStatus(new PostStatus(postId, moderatedStatus)).subscribe(
      () => {
        this.reloadData(false)
      },
      () => {
        alert("Error occurred. Try again later")
      }
    )
  }

  reloadData(hasNewPostBeenAdded: boolean): void {
    this.findTopicById();

    if (hasNewPostBeenAdded) {
      const pageNumber = Math.ceil(this.totalPosts / this.numberOfPostsOnOnePage);
      // if new post has been added check if need to change to next page
      this.totalPosts % this.numberOfPostsOnOnePage === 0 ? this.findPageablePostsOnPage(pageNumber + 1) : this.findPageablePostsOnPage(pageNumber);
    } else {
      this.findPageablePostsOnPage(this.pageNumber);
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyedNotifier.next();
    this.componentDestroyedNotifier.complete();
  }
}
