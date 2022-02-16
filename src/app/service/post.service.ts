import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewPostContent} from "../model/request/new-post-content";
import {PostStatus} from "../model/request/post-status";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  createNewPost(newPost: NewPostContent): Observable<void> {
    return this.httpClient.post<void>(`${this.apiServerUrl}/post/addPost`, newPost);
  }

  changePostStatus(postStatus: PostStatus): Observable<void> {
    return this.httpClient.put<void>(`${this.apiServerUrl}/post/changeStatus`, postStatus);
  }

  findPageablePostsByTopicId(params: any): Observable<void> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/post/findPageablePostsByTopicId/`, {params});
  }

  searchInPosts(params: { query: string; page: number }): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/post/searchInPosts`, {params});
  }
}
