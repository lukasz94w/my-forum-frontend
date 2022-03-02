import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../service/local-storage.service";
import {NewPostContent} from "../../model/request/new-post-content";
import {SignOutEvent} from "../../event/sign-out-event.service";
import {HttpStatusCode} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit, OnChanges, OnDestroy {

  @Input() topicId: number = 0;
  @Input() isTopicOpen: boolean = true;
  @Output() postHasBeenAdded = new EventEmitter();

  form: any = {
    content: null
  }

  isUserWithoutBanLoggedIn: boolean = false;
  isUserWithBanLoggedIn: boolean = false;
  postTextAreaPlaceholder: string = '';

  componentDestroyedNotifier = new Subject();

  constructor(private router: Router, private localStorageService: LocalStorageService,
              private postService: PostService, private signOutEvent: SignOutEvent) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isTopicOpen) {
      if ((!changes.isTopicOpen.firstChange) && (changes.isTopicOpen.previousValue != changes.isTopicOpen.currentValue)) {
        this.setPlaceHolder();
      }
    }
  }

  ngOnInit(): void {
    this.isUserWithoutBanLoggedIn = this.localStorageService.isUserWithoutBanLoggedIn();
    this.isUserWithBanLoggedIn = this.localStorageService.isUserWithBanLoggedIn();
    this.setPlaceHolder();

    this.signOutEvent.signOutEvent$
      .pipe(takeUntil(this.componentDestroyedNotifier))
      .subscribe(
      () => {
        this.isUserWithBanLoggedIn = false;
        this.isUserWithoutBanLoggedIn = false;
        this.setPlaceHolder();
      }
    )
  }

  addPost(ngForm: NgForm) {
    this.postService.createNewPost(new NewPostContent(this.form.content, this.topicId)).subscribe(
      () => {
        this.postHasBeenAdded.emit();
      },
      (error) => {
        alert(error.error.message);
        switch (error.status) {
          case HttpStatusCode.Locked: {
            this.postHasBeenAdded.emit();
            break;
          }
          case HttpStatusCode.Gone: {
            this.router.navigate(['topic-categories']);
            break;
          }
        }
      },
    )
    ngForm.resetForm();
  }

  setPlaceHolder(): void {
    if (this.isUserWithoutBanLoggedIn) {
      this.isTopicOpen ? this.postTextAreaPlaceholder = '' : this.postTextAreaPlaceholder = 'Topic is closed. You cannot add any posts';
    } else if (this.isUserWithBanLoggedIn) {
      this.postTextAreaPlaceholder = 'You are banned and cannot post any comments'
    } else {
      this.postTextAreaPlaceholder = 'Login to add new post';
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyedNotifier.next();
    this.componentDestroyedNotifier.complete();
  }
}
