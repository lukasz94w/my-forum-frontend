import {Injectable, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";
import {error} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class PostService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  addPost(newPost: Post) {
    return this.httpClient.post(`${this.apiServerUrl}/post/addPost`, newPost).subscribe(
      (response) => {
        console.log(response);
      },
     (error) => {
        console.log(error)
       alert("Błędne dane");
     },
    )
  }

  getPostsByTopicId(id: number | undefined): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/post/getPostsByTopicId/` + id);
  }
}
