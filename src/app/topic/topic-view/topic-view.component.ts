import {Component, OnInit} from '@angular/core';
import {Topic} from "../../model/topic";
import {TopicService} from "../../service/topic.service";
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../service/post.service";
import {Post} from "../../model/post";

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})
export class TopicViewComponent implements OnInit {

  topicId: number = 0;
  topic = {} as Topic;
  pageablePosts: Post[] = [];

  currentPage = 1;
  totalPosts = 0;
  totalPages = 0;
  numberOfPostsOnOnePage = 10;

  constructor(private topicService: TopicService, private postService: PostService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe(
      (params: Params) => {
        this.topicId = +params['id'];
        this.findTopicById();
        this.findPageablePostsByTopicId();
      }
    );
  }

  findTopicById(): void {
    this.topicService.getTopicById(this.topicId)
      .subscribe(
        (data: Topic) => {
          this.topic = data;
        },
        (error) => console.log(error)
      );
  }

  findPageablePostsByTopicId(): void {
    const params = {'page': this.currentPage - 1, 'id': this.topicId}
    this.postService.findPageablePostsByTopicId(params).subscribe(
        (data: any) => {
          this.pageablePosts = data.pageablePosts;
          this.totalPosts = data.totalPosts;
          this.totalPages = data.totalPages;
        },
        (error) => console.log(error)
      );
  }

  handlePageChange($event: number) {
    this.currentPage = $event;
    this.findPageablePostsByTopicId();
  }
}
