import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../service/local-storage.service";
import {NewPostContent} from "../../model/request/new-post-content";
import {SignOutEvent} from "../../event/sign-out-event.service";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  @Input() topicId: number = 0;

  form: any = {
    content: null
  }

  isUserWithoutBanLoggedIn: boolean = false;
  isUserWithBanLoggedIn: boolean = false;

  constructor(private router: Router, private localStorageService: LocalStorageService,
              private postService: PostService, private signOutEvent: SignOutEvent) {
  }

  ngOnInit(): void {
    this.isUserWithoutBanLoggedIn = this.localStorageService.isUserWithoutBanLoggedIn();
    this.isUserWithBanLoggedIn = this.localStorageService.isUserWithBanLoggedIn();

    this.signOutEvent.signOutEvent$.subscribe(
      () => {
        this.isUserWithBanLoggedIn = false;
        this.isUserWithoutBanLoggedIn = false;
      }
    )
  }

  onAddNewPost() {
    const newPost = new NewPostContent(this.form.content, this.topicId);
    this.postService.createNewPost(newPost).subscribe(
      (data) => {
        this.router.navigate(['topic/', this.topicId]).then(page => window.location.reload());
        // this.router.navigate(['topic/', this.topicViewComponent.topicId, {queryParams: {number: this.topicViewComponent.totalPosts + 1}}]);
        // TODO: redirect to the newest post after adding it
        // nie tak naprawde wystlac event emitter zeby zreinicjalizowal (jezeli to post 10 to wtedy tez trzeba i strone zmienc)
      },
      () => {
        alert("Error occurred. Please try again later");
      },
    )
  }

  getPlaceHolder(): string {
    if (this.isUserWithoutBanLoggedIn) {
      return '';
    } else if (this.isUserWithBanLoggedIn) {
      return 'You are banned and cannot post any comments'
    } else {
      return 'Login to add new post';
    }
  }
}
