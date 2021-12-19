import {Component} from '@angular/core';
import {PostService} from "../../service/post.service";
import {TopicViewComponent} from "../../topic/topic-view/topic-view.component";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token/token-storage.service";
import {NewPostContent} from "../../model/new-post-content";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {

  form: any = {
    content: null
  }

  constructor(private postService: PostService, private topicViewComponent: TopicViewComponent, private router: Router, public tokenStorageService: TokenStorageService) {
  }

  onAddNewPost() {
    const newPost = new NewPostContent(this.form.content, this.topicViewComponent.topicId);
    this.postService.createNewPost(newPost).subscribe(
      (data) => {
        this.router.navigate(['topic/', this.topicViewComponent.topicId]).then(page => window.location.reload());
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
