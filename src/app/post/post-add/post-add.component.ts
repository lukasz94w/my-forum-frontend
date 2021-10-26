import {Component} from '@angular/core';
import {PostService} from "../../service/post.service";
import {TopicViewComponent} from "../../topic/topic-view/topic-view.component";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../token/token-storage.service";
import {PostContent} from "../../model/post-content";

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

  addNewPost() {
    const content = this.form.content;

    const newPost = new PostContent(content, this.topicViewComponent.id);

    this.postService.createNewPost(newPost).subscribe(
      (response) => {
        this.router.navigate(['topic/', this.topicViewComponent.id]).then(page => window.location.reload());
        console.log(response);
      },
      (error) => {
        console.log(error)
        alert("Błędne dane");
      },
    )
  }
}
