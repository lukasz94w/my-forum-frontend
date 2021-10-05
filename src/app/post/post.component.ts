import { Component, OnInit } from '@angular/core';
import {Post} from "../model/post";
import {PostService} from "../service/post.service";
import {TopicViewComponent} from "../topic/topic-view/topic-view.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService, private topicViewComponent: TopicViewComponent) {
  }

  ngOnInit() {
    return this.postService.getPostsByTopicId(this.topicViewComponent.id)
      .subscribe(
        (posts: any[]) => {
          this.posts = posts;
        },
        (error) => console.log(error)
      );
  }

}
