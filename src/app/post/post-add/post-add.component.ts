import {Component} from '@angular/core';
import {NgForm, ReactiveFormsModule} from "@angular/forms";
import {Topic} from "../../model/topic";
import {PostService} from "../../service/post.service";
import {TopicViewComponent} from "../../topic/topic-view/topic-view.component";
import {Post} from "../../model/post";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {
  topic = {} as Topic;

  constructor(private postService: PostService, private topicViewComponent: TopicViewComponent, private router: Router) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  addNewPost(f: NgForm) {
    const value = f.value;
    const newPost = new Post(value.postContent, this.topicViewComponent.topic);
    this.postService.addPost(newPost);
    this.router.navigate(['topic/', this.topicViewComponent.id]).then(page => window.location.reload());
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(['topic/', this.topicViewComponent.id]));
  }
}
