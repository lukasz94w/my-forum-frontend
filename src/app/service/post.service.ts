import {Injectable, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";
import {PostContent} from "../model/post-content";

@Injectable({
  providedIn: 'root'
})
export class PostService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  createNewPost(newPost: PostContent):Observable<void> {
    return this.httpClient.post<void>(`${this.apiServerUrl}/post/addPost`, newPost);
  }

  getPostsByTopicId(id: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.apiServerUrl}/post/getPostsByTopicId/` + id);
  }
}
