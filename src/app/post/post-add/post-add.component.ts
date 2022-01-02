import {Component, Input} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token/token-storage.service";
import {NewPostContent} from "../../model/request/new-post-content";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {

  @Input() topicId: number = 0;

  form: any = {
    content: null
  }

  constructor(private postService: PostService, private router: Router, public tokenStorageService: TokenStorageService) {
  }

  onAddNewPost() {
    const newPost = new NewPostContent(this.form.content, this.topicId);
    this.postService.createNewPost(newPost).subscribe(
      (data) => {
        this.router.navigate(['topic/', this.topicId]).then(page => window.location.reload());
        // this.router.navigate(['topic/', this.topicViewComponent.topicId, {queryParams: {number: this.topicViewComponent.totalPosts + 1}}]);
        // TODO: redirect to the newest post after adding it
      },
      (error) => {
        console.log(error)
        alert("Invalid data");
      },
    )
  }
}
