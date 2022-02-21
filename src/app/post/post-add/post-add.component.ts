import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../service/local-storage.service";
import {NewPostContent} from "../../model/request/new-post-content";
import {SignOutEvent} from "../../event/sign-out-event.service";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit, OnChanges {

  @Input() topicId: number = 0;
  @Input() isTopicOpen: boolean = true;
  @Output() reloadTopicAndPosts = new EventEmitter();

  form: any = {
    content: null
  }

  isUserWithoutBanLoggedIn: boolean = false;
  isUserWithBanLoggedIn: boolean = false;
  postTextAreaPlaceholder: string = '';

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

    this.signOutEvent.signOutEvent$.subscribe(
      () => {
        this.isUserWithBanLoggedIn = false;
        this.isUserWithoutBanLoggedIn = false;
        this.setPlaceHolder();
      }
    )
  }

  addPost() {
    const newPost = new NewPostContent(this.form.content, this.topicId);
    this.postService.createNewPost(newPost).subscribe(
      () => {
        this.form.content = '';
        // this.form.resetForm();
        // this.form.setErrors(null)
        // this.form.content.errors.set(false);
        // this.form.controls.content.setErrors(null);
        this.reloadTopicAndPosts.emit();
      },
      (error) => {
        alert(error.error.message);
        switch (error.status) {
          case HttpStatusCode.Locked: {
            this.form.content = '';
            this.reloadTopicAndPosts.emit();
            break;
          }
          case HttpStatusCode.Gone: {
            this.router.navigate(['topic-categories']);
            break;
          }
        }
      },
    )
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
}
