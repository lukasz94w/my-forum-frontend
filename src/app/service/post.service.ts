import {Injectable, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";
import {NewPostContent} from "../model/new-post-content";

@Injectable({
  providedIn: 'root'
})
export class PostService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  createNewPost(newPost: NewPostContent):Observable<void> {
    return this.httpClient.post<void>(`${this.apiServerUrl}/post/addPost`, newPost);
  }

  findPageablePostsByTopicId(params: any): Observable<Post[]> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/post/findPageablePostsByTopicId/`, {params});
  }
}
