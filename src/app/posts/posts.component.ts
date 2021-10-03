import { Component, OnInit } from '@angular/core';
import {Post} from "../model/post";
import {HttpClientModule} from "@angular/common/http";
import {PostService} from "../service/post.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit() : void {
  }

}
