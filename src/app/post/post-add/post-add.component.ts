import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../service/local-storage.service";
import {NewPostContent} from "../../model/request/new-post-content";
import {SignOutService} from "../../service/event/sign-out.service";

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

  isLoggedIn: boolean = false;

  constructor(private router: Router, private localStorageService: LocalStorageService,
              private postService: PostService, private signOutService: SignOutService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.localStorageService.isLoggedIn();

    this.signOutService.signOutEvent$.subscribe(
      () => {
        this.isLoggedIn = false;
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
      },
      () => {
        alert("Error occurred. Please try again later");
      },
    )
  }

}
