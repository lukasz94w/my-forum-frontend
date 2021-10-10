import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Post} from "../../model/post";
import {Topic} from "../../model/topic";
import {TopicService} from "../../service/topic.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit {

  constructor(private topicService: TopicService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewTopic(f: NgForm) {
    const value = f.value;
    const newTopic = new Topic(value.title, value.content);
    this.topicService.addNewTopic(newTopic);
    this.router.navigate(['topic']);
  }

  // addNewPost(f: NgForm) {
  //   const value = f.value;
  //   const newPost = new Post(value.postContent, this.topicViewComponent.topic);
  //   this.postService.addPost(newPost);
  //   this.router.navigate(['topic/', this.topicViewComponent.id]).then(page => window.location.reload());
  //   // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(['topic/', this.topicViewComponent.id]));
  // }
}
