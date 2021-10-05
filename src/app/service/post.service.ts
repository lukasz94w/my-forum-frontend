import {Injectable, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  getPostsByTopicId(id: number | undefined): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/post/getPostsByTopicId/` + id);
  }
}
